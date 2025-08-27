import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Search, 
  Filter,
  Mail, 
  FileText, 
  Handshake, 
  CheckCircle2,
  Phone,
  Calendar,
  DollarSign,
  TrendingDown,
  Users,
  Clock,
  Download
} from "lucide-react";

const inadimplentes = [
  {
    id: 1,
    nome: "João Silva",
    apartamento: "Apt 301",
    bloco: "A",
    valorEmAberto: 2450.50,
    dataVencimento: "2024-01-15",
    diasAtraso: 25,
    telefone: "(11) 99999-1234",
    email: "joao.silva@email.com",
    ultimaCobranca: "2024-01-20",
    tipoDebito: "Taxa de Condomínio",
    status: "Em atraso"
  },
  {
    id: 2,
    nome: "Maria Santos", 
    apartamento: "Apt 205",
    bloco: "A",
    valorEmAberto: 850.00,
    dataVencimento: "2024-02-10",
    diasAtraso: 5,
    telefone: "(11) 99999-5678",
    email: "maria.santos@email.com",
    ultimaCobranca: "2024-02-12",
    tipoDebito: "Taxa Extraordinária",
    status: "Negociação"
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    apartamento: "Apt 102", 
    bloco: "B",
    valorEmAberto: 3200.75,
    dataVencimento: "2023-12-20",
    diasAtraso: 45,
    telefone: "(11) 99999-9012",
    email: "carlos@email.com",
    ultimaCobranca: "2024-01-25",
    tipoDebito: "Taxa de Condomínio",
    status: "Inadimplente"
  }
];

const Inadimplencia = () => {
  const { toast } = useToast();
  const [inadimplentesList, setInadimplentesList] = useState(inadimplentes);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroBloco, setFiltroBloco] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modalNegociacao, setModalNegociacao] = useState(false);
  const [selectedInadimplente, setSelectedInadimplente] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em atraso":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Em Atraso</Badge>;
      case "Inadimplente":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Inadimplente</Badge>;
      case "Negociação":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Negociação</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDiasAtrasoColor = (dias: number) => {
    if (dias <= 10) return "text-warning";
    if (dias <= 30) return "text-orange-500";
    return "text-destructive";
  };

  const enviarLembrete = (inadimplente: any) => {
    toast({
      title: "Lembrete enviado!",
      description: `E-mail de cobrança enviado para ${inadimplente.nome}`,
    });
  };

  const emitirSegundaVia = (inadimplente: any) => {
    toast({
      title: "Segunda via gerada!",
      description: `Boleto com juros e multa gerado para ${inadimplente.nome}`,
    });
  };

  const abrirNegociacao = (inadimplente: any) => {
    setSelectedInadimplente(inadimplente);
    setModalNegociacao(true);
  };

  const baixaManual = (inadimplente: any) => {
    setInadimplentesList(prev => prev.filter(item => item.id !== inadimplente.id));
    toast({
      title: "Baixa realizada!",
      description: `Pagamento de ${inadimplente.nome} foi registrado manualmente`,
    });
  };

  const inadimplentesFiltrados = inadimplentesList.filter(item => {
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      item.apartamento.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === "todos" || item.status === filtroStatus;
    const matchBloco = filtroBloco === "todos" || item.bloco === filtroBloco;
    
    return matchBusca && matchStatus && matchBloco;
  });

  const totalEmAberto = inadimplentesList.reduce((acc, item) => acc + item.valorEmAberto, 0);
  const taxaInadimplencia = ((inadimplentesList.length / 127) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Inadimplência</h1>
            <p className="text-muted-foreground mt-1">Controle e recuperação de débitos em atraso</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total em Aberto</p>
                  <p className="text-2xl font-bold text-destructive">
                    R$ {totalEmAberto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Inadimplência</p>
                  <p className="text-2xl font-bold text-warning">{taxaInadimplencia}%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inadimplentes</p>
                  <p className="text-2xl font-bold text-primary">{inadimplentesList.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Maior Atraso</p>
                  <p className="text-2xl font-bold text-destructive">45 dias</p>
                </div>
                <Clock className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou apartamento..."
                  className="pl-10"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="Em atraso">Em Atraso</SelectItem>
                    <SelectItem value="Inadimplente">Inadimplente</SelectItem>
                    <SelectItem value="Negociação">Negociação</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroBloco} onValueChange={setFiltroBloco}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Bloco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="A">Bloco A</SelectItem>
                    <SelectItem value="B">Bloco B</SelectItem>
                    <SelectItem value="C">Bloco C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Inadimplentes */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Lista de Inadimplentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inadimplentesFiltrados.map((inadimplente) => (
                <div key={inadimplente.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-smooth">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{inadimplente.nome}</h3>
                        <Badge variant="outline">{inadimplente.apartamento} - Bloco {inadimplente.bloco}</Badge>
                        {getStatusBadge(inadimplente.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Valor em Aberto</p>
                          <p className="font-semibold text-destructive">
                            R$ {inadimplente.valorEmAberto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vencimento</p>
                          <p className="font-medium">{inadimplente.dataVencimento}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Dias em Atraso</p>
                          <p className={`font-semibold ${getDiasAtrasoColor(inadimplente.diasAtraso)}`}>
                            {inadimplente.diasAtraso} dias
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {inadimplente.telefone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {inadimplente.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => enviarLembrete(inadimplente)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Lembrete
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => emitirSegundaVia(inadimplente)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        2ª Via
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => abrirNegociacao(inadimplente)}
                      >
                        <Handshake className="w-4 h-4 mr-2" />
                        Negociar
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => baixaManual(inadimplente)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Baixa Manual
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal de Negociação */}
        <Dialog open={modalNegociacao} onOpenChange={setModalNegociacao}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-primary" />
                Negociar Pagamento
              </DialogTitle>
            </DialogHeader>
            
            {selectedInadimplente && (
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-semibold">{selectedInadimplente.nome}</h4>
                  <p className="text-sm text-muted-foreground">{selectedInadimplente.apartamento}</p>
                  <p className="text-lg font-bold text-destructive">
                    R$ {selectedInadimplente.valorEmAberto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parcelas">Número de Parcelas</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Parcelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2x</SelectItem>
                          <SelectItem value="3">3x</SelectItem>
                          <SelectItem value="4">4x</SelectItem>
                          <SelectItem value="6">6x</SelectItem>
                          <SelectItem value="12">12x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="desconto">Desconto (%)</Label>
                      <Input id="desconto" type="number" placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primeiroVencimento">Primeiro Vencimento</Label>
                    <Input id="primeiroVencimento" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoesNegociacao">Observações</Label>
                    <Textarea
                      id="observacoesNegociacao"
                      placeholder="Detalhes do acordo..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setModalNegociacao(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Acordo registrado!",
                        description: "Negociação salva com sucesso.",
                      });
                      setModalNegociacao(false);
                    }}
                  >
                    Registrar Acordo
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Inadimplencia;