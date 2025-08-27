import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AbrirAtendimentoModal } from "@/components/modals/AbrirAtendimentoModal";
import { AtribuirTecnicoModal } from "@/components/modals/AtribuirTecnicoModal";
import { EditarChamadoModal } from "@/components/modals/EditarChamadoModal";
import { GerenciarTecnicosModal } from "@/components/modals/GerenciarTecnicosModal";
import AgendarManutencaoModal from "@/components/modals/AgendarManutencaoModal";
import { GerarRelatorioModal } from "@/components/modals/GerarRelatorioModal";
import VisualizarManutencaoModal from "@/components/modals/VisualizarManutencaoModal";
import { 
  Wrench,
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  FileText,
  Filter,
  Download,
  Settings,
  Zap,
  Droplets,
  Flame,
  Shield,
  Brush,
  Bug,
  HardHat,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

// Dados de exemplo para chamados corretivos
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

// Dados de exemplo para manutenções preventivas/periódicas
const manutencoesProgramadas = [
  {
    id: 1,
    protocolo: "PREV001",
    categoria: "equipamentos",
    tipo: "Manutenção de Elevadores",
    equipamento: "Elevador Social",
    dataProxima: "2024-02-15",
    periodicidade: "Semestral",
    responsavel: "Elevadores Tech LTDA",
    status: "agendada",
    custo: "R$ 850,00",
    observacoes: "Revisão geral, lubrificação e testes de segurança"
  },
  {
    id: 2,
    protocolo: "PREV002",
    categoria: "infraestrutura",
    tipo: "Limpeza de Caixas d'Água",
    equipamento: "Caixa Principal",
    dataProxima: "2024-01-30",
    periodicidade: "Semestral",
    responsavel: "AquaLimpa Serviços",
    status: "atrasada",
    custo: "R$ 450,00",
    observacoes: "Limpeza completa e análise da água"
  },
  {
    id: 3,
    protocolo: "PREV003",
    categoria: "seguranca",
    tipo: "Recarga de Extintores",
    equipamento: "Extintores (Todos)",
    dataProxima: "2024-03-10",
    periodicidade: "Anual",
    responsavel: "Segurança Plus",
    status: "pendente",
    custo: "R$ 1.200,00",
    observacoes: "Recarga e teste de 12 extintores"
  },
  {
    id: 4,
    protocolo: "PREV004",
    categoria: "pragas",
    tipo: "Desinsetização/Desratização",
    equipamento: "Áreas Comuns",
    dataProxima: "2024-02-20",
    periodicidade: "Semestral",
    responsavel: "PragaZero Controle",
    status: "agendada",
    custo: "R$ 380,00",
    observacoes: "Aplicação em garagem, halls e áreas externas"
  }
];

// Categorias de manutenção
const categorias = [
  {
    id: "equipamentos",
    nome: "Equipamentos e Estruturas",
    icon: Settings,
    items: [
      "Manutenção de Elevadores",
      "Inspeção de Bombas d'Água", 
      "Verificação do Sistema de Gás",
      "Sistema de Ar Condicionado Central"
    ]
  },
  {
    id: "infraestrutura", 
    nome: "Infraestrutura",
    icon: HardHat,
    items: [
      "Limpeza de Caixas d'Água",
      "Impermeabilização de Áreas Externas",
      "Pintura da Fachada e Áreas Comuns",
      "Manutenção de Pisos e Revestimentos"
    ]
  },
  {
    id: "seguranca",
    nome: "Equipamentos de Segurança", 
    icon: Shield,
    items: [
      "Extintores",
      "Alarmes e Luzes de Emergência",
      "Portas Corta-Fogo",
      "Para-Raios"
    ]
  },
  {
    id: "pragas",
    nome: "Higienização e Controle de Pragas",
    icon: Bug,
    items: [
      "Desinsetização/Desratização",
      "Limpeza de Fossas e Caixas de Gordura", 
      "Limpeza Profunda de Áreas Externas",
      "Sanitização de Ambientes"
    ]
  },
  {
    id: "obras",
    nome: "Obras e Reformas",
    icon: Brush,
    items: [
      "Reformas em Áreas Comuns",
      "Verificação do Sistema Elétrico",
      "Sistema Hidráulico",
      "Reforma de Fachada"
    ]
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

// Funções para badges de manutenções preventivas
const getStatusPreventivaBadge = (status: string) => {
  switch (status) {
    case "agendada":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Agendada</Badge>;
    case "atrasada":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Atrasada</Badge>;
    case "pendente":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
    case "concluida":
      return <Badge className="bg-success/10 text-success border-success/20">Concluída</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Manutencoes = () => {
  const [chamadosList, setChamadosList] = useState(chamados);
  const [manutencoesList, setManutencoesList] = useState(manutencoesProgramadas);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modals, setModals] = useState({
    abrirChamado: false,
    atribuirTecnico: false,
    editarChamado: false,
    gerenciarTecnicos: false,
    agendarManutencao: false,
    gerarRelatorio: false,
    visualizar: false,
  });
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [busca, setBusca] = useState("");
  const [activeTab, setActiveTab] = useState("corretivas");

  const openModal = (modalName: string, item?: any) => {
    setSelectedItem(item || null);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedItem(null);
  };

  const handleChamadoCreated = (novoChamado: any) => {
    setChamadosList(prev => [novoChamado, ...prev]);
  };

  const handleChamadoUpdated = (chamadoAtualizado: any) => {
    setChamadosList(prev => prev.map(c => 
      c.id === chamadoAtualizado.id ? chamadoAtualizado : c
    ));
  };

  // Filtros
  const chamadosFiltrados = chamadosList.filter(chamado => {
    const matchBusca = chamado.protocolo.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.tipo.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.descricao.toLowerCase().includes(busca.toLowerCase());
    
    const matchStatus = filtroStatus === "todos" || chamado.status === filtroStatus;
    
    return matchBusca && matchStatus;
  });

  const manutencoesFiltradas = manutencoesList.filter(manutencao => {
    const matchBusca = manutencao.protocolo.toLowerCase().includes(busca.toLowerCase()) ||
                      manutencao.tipo.toLowerCase().includes(busca.toLowerCase()) ||
                      manutencao.equipamento.toLowerCase().includes(busca.toLowerCase());
    
    const matchStatus = filtroStatus === "todos" || manutencao.status === filtroStatus;
    const matchCategoria = filtroCategoria === "todas" || manutencao.categoria === filtroCategoria;
    
    return matchBusca && matchStatus && matchCategoria;
  });

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestão de Manutenções
            </h1>
            <p className="text-muted-foreground mt-1">
              Controle completo de manutenções preventivas, periódicas e corretivas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openModal("gerarRelatorio")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openModal("gerenciarTecnicos")}
            >
              <User className="w-4 h-4 mr-2" />
              Técnicos
            </Button>
          </div>
        </div>

        {/* KPIs Resumidos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atrasadas</p>
                <p className="text-2xl font-bold text-destructive">3</p>
                <p className="text-sm text-muted-foreground">Urgente</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agendadas</p>
                <p className="text-2xl font-bold text-primary">15</p>
                <p className="text-sm text-muted-foreground">Este mês</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold text-success">89</p>
                <p className="text-sm text-muted-foreground">Este mês</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chamados</p>
                <p className="text-2xl font-bold text-warning">12</p>
                <p className="text-sm text-muted-foreground">Abertos</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Abas Principais */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="preventivas" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Manutenções Preventivas
            </TabsTrigger>
            <TabsTrigger value="corretivas" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Chamados Corretivos
            </TabsTrigger>
          </TabsList>

          {/* Aba Manutenções Preventivas */}
          <TabsContent value="preventivas" className="space-y-6">
            {/* Filtros e Busca para Preventivas */}
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por protocolo, tipo ou equipamento..."
                      className="pl-10"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      className="bg-gradient-primary text-primary-foreground shadow-glow"
                      onClick={() => openModal("agendarManutencao")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agendar Manutenção
                    </Button>
                  </div>
                </div>

                {/* Filtros por Categoria */}
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={filtroCategoria === "todas" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFiltroCategoria("todas")}
                  >
                    Todas
                  </Button>
                  {categorias.map((categoria) => (
                    <Button 
                      key={categoria.id}
                      variant={filtroCategoria === categoria.id ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setFiltroCategoria(categoria.id)}
                      className="flex items-center gap-2"
                    >
                      <categoria.icon className="w-4 h-4" />
                      {categoria.nome}
                    </Button>
                  ))}
                </div>

                {/* Filtros por Status */}
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={filtroStatus === "todos" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFiltroStatus("todos")}
                  >
                    Todos Status
                  </Button>
                  <Button 
                    variant={filtroStatus === "agendada" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFiltroStatus("agendada")}
                  >
                    Agendadas
                  </Button>
                  <Button 
                    variant={filtroStatus === "atrasada" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFiltroStatus("atrasada")}
                  >
                    Atrasadas
                  </Button>
                  <Button 
                    variant={filtroStatus === "pendente" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFiltroStatus("pendente")}
                  >
                    Pendentes
                  </Button>
                  <Button 
                    variant={filtroStatus === "concluida" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFiltroStatus("concluida")}
                  >
                    Concluídas
                  </Button>
                </div>
              </div>
            </Card>

            {/* Lista de Manutenções Preventivas */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <div className="p-6 border-b border-border/50">
                <h3 className="text-lg font-semibold text-foreground">
                  Manutenções Programadas
                </h3>
              </div>
              
              <div className="divide-y divide-border/50">
                {manutencoesFiltradas.map((manutencao) => (
                  <div key={manutencao.id} className="p-6 hover:bg-muted/20 transition-smooth">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {categorias.find(c => c.id === manutencao.categoria)?.icon && 
                            React.createElement(categorias.find(c => c.id === manutencao.categoria)!.icon, { className: "w-6 h-6 text-primary" })
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-foreground">
                              #{manutencao.protocolo}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {manutencao.tipo}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {manutencao.periodicidade}
                            </Badge>
                          </div>
                          
                          <p className="text-foreground mb-2 leading-relaxed">
                            {manutencao.equipamento}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {manutencao.dataProxima}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {manutencao.responsavel}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {manutencao.custo}
                            </div>
                          </div>
                          
                          {manutencao.observacoes && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {manutencao.observacoes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 ml-6">
                        {getStatusPreventivaBadge(manutencao.status)}
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal("visualizar", manutencao)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal("agendarManutencao", manutencao)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal("excluir", manutencao)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Aba Chamados Corretivos */}
          <TabsContent value="corretivas" className="space-y-6">
            {/* Filtros e Busca para Corretivos */}
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
                <div className="flex items-center gap-3">
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
              
              <div className="flex gap-2 flex-wrap mt-4">
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
            </Card>

            {/* Lista de Chamados */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <div className="p-6 border-b border-border/50">
                <h3 className="text-lg font-semibold text-foreground">
                  Chamados de Manutenção Corretiva
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
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <AbrirAtendimentoModal
          open={modals.abrirChamado}
          onOpenChange={() => closeModal("abrirChamado")}
          onChamadoCreated={handleChamadoCreated}
        />
        
        <AtribuirTecnicoModal
          open={modals.atribuirTecnico}
          onOpenChange={() => closeModal("atribuirTecnico")}
          chamado={selectedItem}
          onChamadoUpdated={handleChamadoUpdated}
        />
        
        <EditarChamadoModal
          open={modals.editarChamado}
          onOpenChange={() => closeModal("editarChamado")}
          chamado={selectedItem}
          onChamadoUpdated={handleChamadoUpdated}
        />
        
        <GerenciarTecnicosModal
          open={modals.gerenciarTecnicos}
          onOpenChange={() => closeModal("gerenciarTecnicos")}
        />

        <AgendarManutencaoModal
          open={modals.agendarManutencao}
          onOpenChange={() => closeModal("agendarManutencao")}
          patrimonio={selectedItem}
        />

        <GerarRelatorioModal
          open={modals.gerarRelatorio}
          onOpenChange={() => closeModal("gerarRelatorio")}
        />

        <VisualizarManutencaoModal
          open={modals.visualizar}
          onOpenChange={() => closeModal("visualizar")}
          manutencao={selectedItem}
        />
      </div>
    </div>
  );
};

export default Manutencoes;