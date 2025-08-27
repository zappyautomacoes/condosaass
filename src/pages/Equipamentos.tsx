import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  FileText,
  Search,
  Filter
} from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { Equipamento } from "@/contexts/DataContext";
import NovoEquipamentoModal from "@/components/modals/NovoEquipamentoModal";
import VisualizarEquipamentoModal from "@/components/modals/VisualizarEquipamentoModal";
import EditarEquipamentoModal from "@/components/modals/EditarEquipamentoModal";
import AgendarManutencaoModal from "@/components/modals/AgendarManutencaoModal";
import RelatorioEquipamentosModal from "@/components/modals/RelatorioEquipamentosModal";
import ConfirmarExclusaoModal from "@/components/modals/ConfirmarExclusaoModal";
import { useToast } from "@/hooks/use-toast";

const Equipamentos = () => {
  const { state, dispatch } = useData();
  const { toast } = useToast();
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");
  const [termoBusca, setTermoBusca] = useState("");
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | null>(null);
  
  // Estados dos modais
  const [modalNovo, setModalNovo] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalManutencao, setModalManutencao] = useState(false);
  const [modalRelatorio, setModalRelatorio] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  // Dados dos equipamentos
  const equipamentos = state.equipamentos;
  const manutencoes = state.manutencoes;

  // Estatísticas
  const equipamentosFuncionando = equipamentos.filter(eq => eq.situacao === 'ativo').length;
  const equipamentosManutencao = equipamentos.filter(eq => eq.situacao === 'manutencao').length;
  const equipamentosProblema = equipamentos.filter(eq => eq.situacao === 'inativo').length;
  const totalMonitorados = equipamentos.length;

  // Filtrar equipamentos
  const equipamentosFiltrados = equipamentos.filter(equipamento => {
    const filtroTexto = termoBusca === "" || 
      equipamento.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      equipamento.localInstalacao.toLowerCase().includes(termoBusca.toLowerCase());
    
    const filtroTipo = filtroCategoria === "todos" || 
      equipamento.tipo === filtroCategoria;
    
    return filtroTexto && filtroTipo;
  });

  // Categorias de equipamentos
  const categorias = [
    { id: "todos", nome: "Todos", icon: "📋", count: equipamentos.length },
    { id: "extintor", nome: "Extintores", icon: "🧯", count: equipamentos.filter(eq => eq.tipo === 'extintor').length },
    { id: "alarme", nome: "Alarmes", icon: "🚨", count: equipamentos.filter(eq => eq.tipo === 'alarme').length },
    { id: "luz_emergencia", nome: "Luzes", icon: "💡", count: equipamentos.filter(eq => eq.tipo === 'luz_emergencia').length },
    { id: "porta_corta_fogo", nome: "Portas", icon: "🚪", count: equipamentos.filter(eq => eq.tipo === 'porta_corta_fogo').length },
    { id: "outro", nome: "Outros", icon: "⚙️", count: equipamentos.filter(eq => eq.tipo === 'outro').length }
  ];

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "extintor": return "Extintor";
      case "alarme": return "Sistema de Alarme";
      case "luz_emergencia": return "Luz de Emergência";
      case "porta_corta_fogo": return "Porta Corta-Fogo";
      case "outro": return "Outro";
      default: return tipo;
    }
  };

  const getStatusBadge = (situacao: string) => {
    switch (situacao) {
      case "ativo":
        return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
      case "manutencao":
        return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Wrench className="w-3 h-3" />Manutenção</Badge>;
      case "inativo":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Inativo</Badge>;
      default:
        return <Badge variant="outline">{situacao}</Badge>;
    }
  };

  const handleVisualizar = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setModalVisualizar(true);
  };

  const handleEditar = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setModalEditar(true);
  };

  const handleExcluir = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setModalExcluir(true);
  };

  const handleAgendarManutencao = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    setModalManutencao(true);
  };

  const confirmarExclusao = () => {
    if (equipamentoSelecionado) {
      dispatch({ type: 'DELETE_EQUIPAMENTO', payload: equipamentoSelecionado.id });
      toast({
        title: "Equipamento excluído",
        description: "O equipamento foi removido com sucesso",
      });
      setModalExcluir(false);
      setEquipamentoSelecionado(null);
    }
  };

  const getProximaManutencao = (equipamento: Equipamento) => {
    if (equipamento.proximaManutencao) {
      const diasRestantes = Math.ceil((new Date(equipamento.proximaManutencao).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      return `${diasRestantes} dias`;
    }
    return "-";
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Equipamentos</h1>
            <p className="text-muted-foreground mt-1">
              Monitoramento e controle de todos os equipamentos do condomínio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setModalRelatorio(true)} variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button onClick={() => setModalNovo(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Equipamento
            </Button>
          </div>
        </div>
        
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Funcionando</p>
                  <p className="text-2xl font-bold text-success">{equipamentosFuncionando}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Manutenção</p>
                  <p className="text-2xl font-bold text-warning">{equipamentosManutencao}</p>
                </div>
                <Wrench className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Com Problema</p>
                  <p className="text-2xl font-bold text-destructive">{equipamentosProblema}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monitorados</p>
                  <p className="text-2xl font-bold text-primary">{totalMonitorados}</p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros por Categoria */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Categorias de Equipamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {categorias.map((categoria) => (
                <Button
                  key={categoria.id}
                  variant={filtroCategoria === categoria.id ? "default" : "outline"}
                  onClick={() => setFiltroCategoria(categoria.id)}
                  className="h-auto p-4 flex-col gap-2"
                >
                  <span className="text-2xl">{categoria.icon}</span>
                  <div className="text-center">
                    <p className="font-medium text-sm">{categoria.nome}</p>
                    <p className="text-xs opacity-80">{categoria.count} itens</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Busca e Lista de Equipamentos */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Lista de Equipamentos</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar equipamentos..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {equipamentosFiltrados.length} de {equipamentos.length} equipamentos
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipamentosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum equipamento encontrado</p>
                </div>
              ) : (
                equipamentosFiltrados.map((equipamento) => (
                  <div key={equipamento.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="font-medium">{equipamento.nome}</p>
                        <p className="text-sm text-muted-foreground">{getTipoLabel(equipamento.tipo)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Local</p>
                        <p className="text-sm text-muted-foreground">{equipamento.localInstalacao}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Última Manutenção</p>
                        <p className="text-sm text-muted-foreground">
                          {equipamento.ultimaManutencao ? new Date(equipamento.ultimaManutencao).toLocaleDateString('pt-BR') : '-'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Próxima Manutenção</p>
                        <p className="text-sm text-muted-foreground">{getProximaManutencao(equipamento)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {getStatusBadge(equipamento.situacao)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleVisualizar(equipamento)}
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEditar(equipamento)}
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleAgendarManutencao(equipamento)}
                        title="Agendar Manutenção"
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleExcluir(equipamento)}
                        title="Excluir"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modais */}
      <NovoEquipamentoModal 
        open={modalNovo} 
        onOpenChange={setModalNovo} 
      />
      
      <VisualizarEquipamentoModal 
        open={modalVisualizar} 
        onOpenChange={setModalVisualizar}
        equipamento={equipamentoSelecionado}
      />
      
      <EditarEquipamentoModal 
        open={modalEditar} 
        onOpenChange={setModalEditar}
        equipamento={equipamentoSelecionado}
      />
      
      <AgendarManutencaoModal 
        open={modalManutencao} 
        onOpenChange={setModalManutencao}
        patrimonio={equipamentoSelecionado}
      />
      
      <RelatorioEquipamentosModal 
        open={modalRelatorio} 
        onOpenChange={setModalRelatorio}
      />
      
      <ConfirmarExclusaoModal
        open={modalExcluir}
        onOpenChange={setModalExcluir}
        onConfirm={confirmarExclusao}
        title="Excluir Equipamento"
        description={`Tem certeza que deseja excluir o equipamento "${equipamentoSelecionado?.nome}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  );
};

export default Equipamentos;