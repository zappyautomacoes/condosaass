import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CadastrarMoradorModal } from "@/components/modals/CadastrarMoradorModal";
import { EditarMoradorModal } from "@/components/modals/EditarMoradorModal";
import { DetalhesMoradorModal } from "@/components/modals/DetalhesMoradorModal";
import { HistoricoInteracoesModal } from "@/components/modals/HistoricoInteracoesModal";
import { HistoricoMoradorModal } from "@/components/modals/HistoricoMoradorModal";
import { ExportarMoradoresModal } from "@/components/modals/ExportarMoradoresModal";
import { 
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Edit,
  MoreHorizontal,
  Download,
  History,
  FileText
} from "lucide-react";

const moradores = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-1234",
    apartamento: "Apt 301",
    bloco: "A",
    status: "ativo",
    tipo: "proprietario",
    ultimaInteracao: "2024-01-20",
    totalInteracoes: 12
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com", 
    telefone: "(11) 99999-5678",
    apartamento: "Apt 205",
    bloco: "A",
    status: "ativo",
    tipo: "inquilino",
    ultimaInteracao: "2024-01-18",
    totalInteracoes: 8
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    telefone: "(11) 99999-9012",
    apartamento: "Apt 102",
    bloco: "B", 
    status: "inativo",
    tipo: "proprietario",
    ultimaInteracao: "2024-01-10",
    totalInteracoes: 25
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 99999-3456",
    apartamento: "Apt 401",
    bloco: "A",
    status: "ativo",
    tipo: "proprietario",
    ultimaInteracao: "2024-01-22",
    totalInteracoes: 15
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ativo":
      return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
    case "inativo":
      return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Inativo</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTipoBadge = (tipo: string) => {
  switch (tipo) {
    case "proprietario":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Proprietário</Badge>;
    case "inquilino":
      return <Badge className="bg-accent/10 text-accent border-accent/20">Inquilino</Badge>;
    default:
      return <Badge variant="outline">{tipo}</Badge>;
  }
};

const getInitials = (nome: string) => {
  return nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const Moradores = () => {
  const [moradoresList, setMoradoresList] = useState(moradores);
  const [selectedMorador, setSelectedMorador] = useState<any>(null);
  const [modals, setModals] = useState({
    cadastrarMorador: false,
    editarMorador: false,
    detalhesMorador: false,
    historicoInteracoes: false,
    historicoMorador: false,
    exportarMoradores: false,
  });
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busca, setBusca] = useState("");

  const openModal = (modalName: string, morador?: any) => {
    setSelectedMorador(morador || null);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedMorador(null);
  };

  const handleMoradorCreated = (novoMorador: any) => {
    setMoradoresList(prev => [novoMorador, ...prev]);
  };

  const handleMoradorUpdated = (moradorAtualizado: any) => {
    setMoradoresList(prev => prev.map(m => 
      m.id === moradorAtualizado.id ? moradorAtualizado : m
    ));
  };

  const moradoresFiltrados = moradoresList.filter(morador => {
    const matchBusca = morador.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      morador.apartamento.toLowerCase().includes(busca.toLowerCase()) ||
                      morador.telefone.includes(busca);
    
    const matchStatus = filtroStatus === "todos" || morador.status === filtroStatus;
    const matchTipo = filtroTipo === "todos" || morador.tipo === filtroTipo;
    
    return matchBusca && matchStatus && matchTipo;
  });

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Moradores
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestão de contatos e dados cadastrais
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openModal("exportarMoradores")}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openModal("historicoInteracoes")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Histórico
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-primary text-primary-foreground shadow-glow"
              onClick={() => openModal("cadastrarMorador")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Morador
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">127</p>
                <p className="text-sm text-muted-foreground">Moradores</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold text-success">115</p>
                <p className="text-sm text-muted-foreground">90.5%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interações</p>
                <p className="text-2xl font-bold text-accent">1.2k</p>
                <p className="text-sm text-muted-foreground">Este mês</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="text-2xl font-bold text-warning">98%</p>
                <p className="text-sm text-muted-foreground">Conectados</p>
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
                placeholder="Buscar por nome, apartamento ou telefone..."
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
                variant={filtroStatus === "ativo" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("ativo")}
              >
                Ativos
              </Button>
              <Button 
                variant={filtroTipo === "proprietario" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroTipo("proprietario")}
              >
                Proprietários
              </Button>
              <Button 
                variant={filtroTipo === "inquilino" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroTipo("inquilino")}
              >
                Inquilinos
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista de Moradores */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">
              Lista de Moradores
            </h3>
          </div>
          
          <div className="divide-y divide-border/50">
            {moradoresFiltrados.map((morador) => (
              <div key={morador.id} className="p-6 hover:bg-muted/20 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(morador.nome)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-foreground">
                          {morador.nome}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {morador.apartamento} - Bloco {morador.bloco}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {morador.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {morador.telefone}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {getStatusBadge(morador.status)}
                        {getTipoBadge(morador.tipo)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Última interação</p>
                      <p className="font-medium text-foreground">{morador.ultimaInteracao}</p>
                      <p className="text-xs text-muted-foreground">
                        {morador.totalInteracoes} total
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openModal("historicoMorador", morador)}
                        title="Histórico do Morador"
                      >
                        <History className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openModal("historicoInteracoes", morador)}
                        title="Histórico de Interações"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openModal("editarMorador", morador)}
                        title="Editar Morador"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openModal("detalhesMorador", morador)}
                        title="Ver Detalhes"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Modals */}
        <CadastrarMoradorModal
          open={modals.cadastrarMorador}
          onOpenChange={() => closeModal("cadastrarMorador")}
          onMoradorCreated={handleMoradorCreated}
        />
        
        <EditarMoradorModal
          open={modals.editarMorador}
          onOpenChange={() => closeModal("editarMorador")}
          morador={selectedMorador}
          onMoradorUpdated={handleMoradorUpdated}
        />
        
        <DetalhesMoradorModal
          open={modals.detalhesMorador}
          onOpenChange={() => closeModal("detalhesMorador")}
          morador={selectedMorador}
        />
        
        <HistoricoInteracoesModal
          open={modals.historicoInteracoes}
          onOpenChange={() => closeModal("historicoInteracoes")}
          morador={selectedMorador}
        />

        <HistoricoMoradorModal
          open={modals.historicoMorador}
          onOpenChange={() => closeModal("historicoMorador")}
          morador={selectedMorador}
        />

        <ExportarMoradoresModal
          open={modals.exportarMoradores}
          onOpenChange={() => closeModal("exportarMoradores")}
        />
      </div>
    </div>
  );
};

export default Moradores;