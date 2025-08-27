import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AbrirAtendimentoModal } from "@/components/modals/AbrirAtendimentoModal";
import { AtribuirTecnicoModal } from "@/components/modals/AtribuirTecnicoModal";
import { EditarChamadoModal } from "@/components/modals/EditarChamadoModal";
import { GerenciarTecnicosModal } from "@/components/modals/GerenciarTecnicosModal";
import { 
  Wrench,
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  MapPin
} from "lucide-react";

const chamados = [
  {
    id: 1,
    protocolo: "MAN001234",
    tipo: "Hidráulica",
    descricao: "Vazamento no banheiro - água escorrendo pela parede",
    morador: "João Silva",
    apartamento: "Apt 301",
    prioridade: "alta",
    status: "aberto",
    dataAbertura: "2024-01-20 14:30",
    tecnico: null
  },
  {
    id: 2,
    protocolo: "MAN001235", 
    tipo: "Elétrica",
    descricao: "Falta de energia no corredor do 2º andar",
    morador: "Maria Santos",
    apartamento: "Apt 205",
    prioridade: "media",
    status: "em_andamento",
    dataAbertura: "2024-01-19 10:15",
    tecnico: "Carlos Técnico"
  },
  {
    id: 3,
    protocolo: "MAN001236",
    tipo: "Limpeza",
    descricao: "Limpeza da caixa d'água do prédio",
    morador: "Sistema",
    apartamento: "Geral",
    prioridade: "baixa",
    status: "concluido",
    dataAbertura: "2024-01-15 08:00",
    tecnico: "Pedro Limpeza"
  }
];

const getPrioridadeBadge = (prioridade: string) => {
  switch (prioridade) {
    case "alta":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Alta</Badge>;
    case "media":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Média</Badge>;
    case "baixa":
      return <Badge className="bg-success/10 text-success border-success/20">Baixa</Badge>;
    default:
      return <Badge variant="outline">{prioridade}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "aberto":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Aberto</Badge>;
    case "em_andamento":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Em Andamento</Badge>;
    case "concluido":
      return <Badge className="bg-success/10 text-success border-success/20">Concluído</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "aberto":
      return <AlertTriangle className="w-4 h-4 text-destructive" />;
    case "em_andamento":
      return <Clock className="w-4 h-4 text-warning" />;
    case "concluido":
      return <CheckCircle className="w-4 h-4 text-success" />;
    default:
      return null;
  }
};

const Manutencoes = () => {
  const [chamadosList, setChamadosList] = useState(chamados);
  const [selectedChamado, setSelectedChamado] = useState<any>(null);
  const [modals, setModals] = useState({
    abrirChamado: false,
    atribuirTecnico: false,
    editarChamado: false,
    gerenciarTecnicos: false,
  });
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const openModal = (modalName: string, chamado?: any) => {
    setSelectedChamado(chamado || null);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedChamado(null);
  };

  const handleChamadoCreated = (novoChamado: any) => {
    setChamadosList(prev => [novoChamado, ...prev]);
  };

  const handleChamadoUpdated = (chamadoAtualizado: any) => {
    setChamadosList(prev => prev.map(c => 
      c.id === chamadoAtualizado.id ? chamadoAtualizado : c
    ));
  };

  const chamadosFiltrados = chamadosList.filter(chamado => {
    const matchBusca = chamado.protocolo.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.tipo.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.descricao.toLowerCase().includes(busca.toLowerCase());
    
    const matchStatus = filtroStatus === "todos" || chamado.status === filtroStatus;
    
    return matchBusca && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Manutenções
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestão de chamados e serviços técnicos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openModal("gerenciarTecnicos")}
            >
              <User className="w-4 h-4 mr-2" />
              Técnicos
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-primary text-primary-foreground shadow-glow"
              onClick={() => openModal("abrirChamado")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Chamado
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Abertos</p>
                <p className="text-2xl font-bold text-destructive">12</p>
                <p className="text-sm text-muted-foreground">+3 hoje</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-sm text-muted-foreground">5 técnicos</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold text-success">156</p>
                <p className="text-sm text-muted-foreground">Este mês</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold text-primary">4.2h</p>
                <p className="text-sm text-muted-foreground">Resolução</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="p-6 bg-gradient-card border-0 shadow-soft">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por protocolo, tipo ou descrição..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={filtroStatus === "todos" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("todos")}
              >
                Todos
              </Button>
              <Button 
                variant={filtroStatus === "aberto" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("aberto")}
              >
                Abertos
              </Button>
              <Button 
                variant={filtroStatus === "em_andamento" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("em_andamento")}
              >
                Em Andamento
              </Button>
              <Button 
                variant={filtroStatus === "concluido" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("concluido")}
              >
                Concluídos
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista de Chamados */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">
              Chamados de Manutenção
            </h3>
          </div>
          
          <div className="divide-y divide-border/50">
            {chamadosFiltrados.map((chamado) => (
              <div key={chamado.id} className="p-6 hover:bg-muted/20 transition-smooth">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {getStatusIcon(chamado.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold text-foreground">
                          #{chamado.protocolo}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {chamado.tipo}
                        </Badge>
                        {getPrioridadeBadge(chamado.prioridade)}
                      </div>
                      
                      <p className="text-foreground mb-2 leading-relaxed">
                        {chamado.descricao}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {chamado.morador}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {chamado.apartamento}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {chamado.dataAbertura}
                        </div>
                      </div>
                      
                      {chamado.tecnico && (
                        <p className="text-sm text-primary mt-2">
                          Técnico: {chamado.tecnico}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    {getStatusBadge(chamado.status)}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openModal("editarChamado", chamado)}
                      >
                        Editar
                      </Button>
                      {chamado.status === "aberto" && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-primary text-primary-foreground"
                          onClick={() => openModal("atribuirTecnico", chamado)}
                        >
                          Atribuir
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Modals */}
        <AbrirAtendimentoModal
          open={modals.abrirChamado}
          onOpenChange={() => closeModal("abrirChamado")}
          onChamadoCreated={handleChamadoCreated}
        />
        
        <AtribuirTecnicoModal
          open={modals.atribuirTecnico}
          onOpenChange={() => closeModal("atribuirTecnico")}
          chamado={selectedChamado}
          onChamadoUpdated={handleChamadoUpdated}
        />
        
        <EditarChamadoModal
          open={modals.editarChamado}
          onOpenChange={() => closeModal("editarChamado")}
          chamado={selectedChamado}
          onChamadoUpdated={handleChamadoUpdated}
        />
        
        <GerenciarTecnicosModal
          open={modals.gerenciarTecnicos}
          onOpenChange={() => closeModal("gerenciarTecnicos")}
        />
      </div>
    </div>
  );
};

export default Manutencoes;