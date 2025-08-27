import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  FileText, 
  Vote, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface Assembleia {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  tipo: "ordinaria" | "extraordinaria";
  status: "agendada" | "em-andamento" | "finalizada";
  participantes: number;
  totalMoradores: number;
  pauta: string[];
  ata?: string;
}

interface Votacao {
  id: string;
  assembleiaId: string;
  titulo: string;
  descricao: string;
  opcoes: { id: string; texto: string; votos: number }[];
  status: "aberta" | "fechada";
  totalVotos: number;
}

const Assembleias = () => {
  const [assembleias] = useState<Assembleia[]>([
    {
      id: "1",
      titulo: "Assembleia Ordinária - Dezembro 2024",
      data: "2024-12-15",
      hora: "19:00",
      tipo: "ordinaria",
      status: "agendada",
      participantes: 0,
      totalMoradores: 45,
      pauta: [
        "Apresentação das contas do mês",
        "Aprovação do orçamento para 2025",
        "Discussão sobre reformas na área comum",
        "Eleição do novo síndico"
      ]
    },
    {
      id: "2",
      titulo: "Assembleia Extraordinária - Novembro 2024",
      data: "2024-11-20",
      hora: "20:00",
      tipo: "extraordinaria",
      status: "finalizada",
      participantes: 32,
      totalMoradores: 45,
      pauta: [
        "Aprovação de obras emergenciais",
        "Contratação de nova empresa de limpeza"
      ],
      ata: "Ata da assembleia extraordinária realizada em 20/11/2024..."
    }
  ]);

  const [votacoes] = useState<Votacao[]>([
    {
      id: "1",
      assembleiaId: "1",
      titulo: "Aprovação do Orçamento 2025",
      descricao: "Votação para aprovação da proposta orçamentária para o ano de 2025",
      opcoes: [
        { id: "1", texto: "Aprovar", votos: 0 },
        { id: "2", texto: "Reprovar", votos: 0 },
        { id: "3", texto: "Aprovar com ressalvas", votos: 0 }
      ],
      status: "aberta",
      totalVotos: 0
    }
  ]);

  const handleVotar = (votacaoId: string, opcaoId: string) => {
    toast.success("Voto registrado com sucesso!");
  };

  const handleConvocarAssembleia = () => {
    toast.success("Convocação enviada para todos os moradores!");
  };

  const getStatusBadge = (status: Assembleia["status"]) => {
    const variants = {
      agendada: "default",
      "em-andamento": "secondary", 
      finalizada: "outline"
    } as const;

    const labels = {
      agendada: "Agendada",
      "em-andamento": "Em Andamento",
      finalizada: "Finalizada"
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getTipoBadge = (tipo: Assembleia["tipo"]) => {
    return (
      <Badge variant={tipo === "ordinaria" ? "secondary" : "destructive"}>
        {tipo === "ordinaria" ? "Ordinária" : "Extraordinária"}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assembleias</h1>
          <p className="text-muted-foreground">
            Gerencie assembleias, pautas e votações do condomínio
          </p>
        </div>
        <Button onClick={handleConvocarAssembleia} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Assembleia
        </Button>
      </div>

      <Tabs defaultValue="assembleias" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assembleias">Assembleias</TabsTrigger>
          <TabsTrigger value="votacoes">Votações</TabsTrigger>
          <TabsTrigger value="atas">Atas</TabsTrigger>
        </TabsList>

        <TabsContent value="assembleias" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assembleias.map((assembleia) => (
              <Card key={assembleia.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg">{assembleia.titulo}</CardTitle>
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(assembleia.status)}
                      {getTipoBadge(assembleia.tipo)}
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(assembleia.data).toLocaleDateString('pt-BR')} às {assembleia.hora}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Participantes
                    </span>
                    <span className="font-medium">
                      {assembleia.participantes}/{assembleia.totalMoradores}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Pauta
                    </span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {assembleia.pauta.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {item}
                        </li>
                      ))}
                      {assembleia.pauta.length > 2 && (
                        <li className="text-xs">
                          +{assembleia.pauta.length - 2} itens...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="h-4 w-4" />
                      Ver Detalhes
                    </Button>
                    {assembleia.status === "finalizada" && assembleia.ata && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Ata
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="votacoes" className="space-y-4">
          <div className="grid gap-4">
            {votacoes.map((votacao) => (
              <Card key={votacao.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Vote className="h-5 w-5" />
                        {votacao.titulo}
                      </CardTitle>
                      <CardDescription>{votacao.descricao}</CardDescription>
                    </div>
                    <Badge variant={votacao.status === "aberta" ? "default" : "secondary"}>
                      {votacao.status === "aberta" ? "Votação Aberta" : "Votação Encerrada"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {votacao.opcoes.map((opcao) => (
                      <div key={opcao.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <span>{opcao.texto}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {opcao.votos} votos
                          </span>
                          {votacao.status === "aberta" && (
                            <Button 
                              size="sm" 
                              onClick={() => handleVotar(votacao.id, opcao.id)}
                            >
                              Votar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Total de votos: {votacao.totalVotos}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="atas" className="space-y-4">
          <div className="grid gap-4">
            {assembleias
              .filter(a => a.status === "finalizada" && a.ata)
              .map((assembleia) => (
                <Card key={assembleia.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Ata - {assembleia.titulo}
                    </CardTitle>
                    <CardDescription>
                      {new Date(assembleia.data).toLocaleDateString('pt-BR')} às {assembleia.hora}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {assembleia.participantes} participantes
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Finalizada
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          Visualizar
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Baixar PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assembleias;