import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, Plus, Search, Filter, Upload, Eye, Edit, MapPin, Calendar, DollarSign, AlertTriangle, CheckCircle2, Wrench, Download } from "lucide-react";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import NovoPatrimonioModal from "@/components/modals/NovoPatrimonioModal";
import EditarPatrimonioModal from "@/components/modals/EditarPatrimonioModal";
import VisualizarPatrimonioModal from "@/components/modals/VisualizarPatrimonioModal";
import AgendarManutencaoModal from "@/components/modals/AgendarManutencaoModal";
import FiltroPatrimonioModal from "@/components/modals/FiltroPatrimonioModal";
import InventarioModal from "@/components/modals/InventarioModal";

const Patrimonio = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const { state } = useData();
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showAgendarModal, setShowAgendarModal] = useState(false);
  const [showFiltroModal, setShowFiltroModal] = useState(false);
  const [showInventarioModal, setShowInventarioModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [filtros, setFiltros] = useState({
    categoria: "",
    status: "",
    local: "",
    dataAquisicaoInicio: "",
    dataAquisicaoFim: "",
    valorMinimo: "",
    valorMaximo: ""
  });

  const mockPatrimonio = [
    {
      id: 1,
      nome: "Televisão Samsung 55\"",
      categoria: "Eletrônicos",
      numeroPlaqueta: "PAT-001",
      localFisico: "Salão de Festas",
      dataAquisicao: "2024-01-15",
      valorAquisicao: 2500,
      fornecedor: "Eletrônicos Tech",
      status: "ativo",
      ultimaManutencao: "2024-07-15",
      proximaManutencao: "2025-01-15",
      foto: null
    },
    {
      id: 2,
      nome: "Bomba d'água 5HP",
      categoria: "Equipamentos",
      numeroPlaqueta: "PAT-002",
      localFisico: "Casa de Máquinas",
      dataAquisicao: "2023-08-20",
      valorAquisicao: 3200,
      fornecedor: "Bombas Hidráulicas LTDA",
      status: "manutencao",
      ultimaManutencao: "2024-08-20",
      proximaManutencao: "2024-09-05",
      foto: null
    },
    {
      id: 3,
      nome: "Mesa de Ping Pong",
      categoria: "Móveis",
      numeroPlaqueta: "PAT-003",
      localFisico: "Área de Lazer",
      dataAquisicao: "2024-03-10",
      valorAquisicao: 800,
      fornecedor: "Móveis e Decoração",
      status: "ativo",
      ultimaManutencao: null,
      proximaManutencao: "2024-12-10",
      foto: null
    },
    {
      id: 4,
      nome: "Gerador 15KVA",
      categoria: "Equipamentos",
      numeroPlaqueta: "PAT-004",
      localFisico: "Subsolo",
      dataAquisicao: "2023-11-05",
      valorAquisicao: 8500,
      fornecedor: "Geradores Brasil",
      status: "baixado",
      ultimaManutencao: "2024-05-05",
      proximaManutencao: null,
      foto: null
    }
  ];

  const categorias = [
    { nome: "Eletrônicos", count: 1, icon: "📺" },
    { nome: "Equipamentos", count: 2, icon: "⚙️" },
    { nome: "Móveis", count: 1, icon: "🪑" },
    { nome: "Ferramentas", count: 0, icon: "🔧" },
    { nome: "Veículos", count: 0, icon: "🚗" },
    { nome: "Outros", count: 0, icon: "📦" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
      case "manutencao":
        return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Wrench className="w-3 h-3" />Manutenção</Badge>;
      case "baixado":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Baixado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const applyFilters = (filters: any) => {
    setFiltros(filters);
  };

  const handleCategoriaClick = (categoria: string) => {
    setSelectedCategoria(selectedCategoria === categoria ? "" : categoria);
  };

  const handleDownloadRelatorio = (tipo: string) => {
    toast({
      title: "Relatório gerado",
      description: `${tipo} foi gerado e está sendo baixado`,
    });
    console.log(`Downloading: ${tipo}`);
  };

  const filteredPatrimonio = mockPatrimonio.filter(item => {
    // Filtro de busca por texto
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numeroPlaqueta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.localFisico.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por categoria selecionada
    const matchesCategoria = !selectedCategoria || item.categoria === selectedCategoria;

    // Filtros avançados
    const matchesFilters = (
      (!filtros.categoria || item.categoria === filtros.categoria) &&
      (!filtros.status || item.status === filtros.status) &&
      (!filtros.local || item.localFisico.toLowerCase().includes(filtros.local.toLowerCase())) &&
      (!filtros.dataAquisicaoInicio || new Date(item.dataAquisicao) >= new Date(filtros.dataAquisicaoInicio)) &&
      (!filtros.dataAquisicaoFim || new Date(item.dataAquisicao) <= new Date(filtros.dataAquisicaoFim)) &&
      (!filtros.valorMinimo || item.valorAquisicao >= parseFloat(filtros.valorMinimo)) &&
      (!filtros.valorMaximo || item.valorAquisicao <= parseFloat(filtros.valorMaximo))
    );

    return matchesSearch && matchesCategoria && matchesFilters;
  });

  const valorTotalPatrimonio = mockPatrimonio
    .filter(item => item.status !== 'baixado')
    .reduce((total, item) => total + item.valorAquisicao, 0);

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Patrimônio</h1>
            <p className="text-muted-foreground mt-1">Controle completo dos bens do condomínio</p>
          </div>
          <Button className="gap-2" onClick={() => setShowNovoModal(true)}>
            <Plus className="w-4 h-4" />
            Cadastrar Item
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Itens Ativos</p>
                  <p className="text-2xl font-bold text-success">2</p>
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
                  <p className="text-2xl font-bold text-warning">1</p>
                </div>
                <Wrench className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Baixados</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold text-primary">R$ {valorTotalPatrimonio.toLocaleString('pt-BR')}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categorias */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categorias.map((categoria) => (
                <div 
                  key={categoria.nome} 
                  onClick={() => handleCategoriaClick(categoria.nome)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-smooth ${
                    selectedCategoria === categoria.nome 
                      ? 'bg-primary/20 border border-primary/30' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{categoria.icon}</span>
                    <span className="font-medium">{categoria.nome}</span>
                  </div>
                  <Badge variant={selectedCategoria === categoria.nome ? "default" : "secondary"}>
                    {categoria.count}
                  </Badge>
                </div>
              ))}
              {selectedCategoria && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedCategoria("")}
                  className="w-full"
                >
                  Mostrar Todas as Categorias
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Lista de Patrimônio */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filtros e Busca */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome, plaqueta ou local..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => setShowFiltroModal(true)}
                    >
                      <Filter className="w-4 h-4" />
                      Filtros
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => setShowInventarioModal(true)}
                    >
                      <Upload className="w-4 h-4" />
                      Inventário
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="lista" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lista">Lista de Patrimônio</TabsTrigger>
                <TabsTrigger value="manutencao">Manutenções</TabsTrigger>
                <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              </TabsList>

              <TabsContent value="lista">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Plaqueta</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Local</TableHead>
                          <TableHead>Aquisição</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPatrimonio.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={item.foto || `https://api.dicebear.com/7.x/shapes/svg?seed=${item.nome}`} />
                                  <AvatarFallback>{item.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{item.nome}</p>
                                  <p className="text-sm text-muted-foreground">{item.fornecedor}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {item.numeroPlaqueta}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.categoria}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                {item.localFisico}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                {new Date(item.dataAquisicao).toLocaleDateString('pt-BR')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                R$ {item.valorAquisicao.toLocaleString('pt-BR')}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => { setSelectedItem(item); setShowVisualizarModal(true); }}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => { setSelectedItem(item); setShowEditarModal(true); }}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manutencao">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Cronograma de Manutenções</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockPatrimonio
                      .filter(item => item.proximaManutencao)
                      .map(item => {
                        const proximaManutencao = new Date(item.proximaManutencao!);
                        const hoje = new Date();
                        const diasRestantes = Math.ceil((proximaManutencao.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
                        const isVencendo = diasRestantes <= 30;
                        
                        return (
                          <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                            isVencendo ? 'bg-warning/10 border-warning/20' : 'bg-muted/30 border-border/50'
                          }`}>
                            <div className="flex items-center gap-3">
                              <Wrench className={`w-5 h-5 ${isVencendo ? 'text-warning' : 'text-muted-foreground'}`} />
                              <div>
                                <p className="font-medium">{item.nome}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.localFisico} • {diasRestantes > 0 ? `Em ${diasRestantes} dias` : 'Atrasada'}
                                </p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowAgendarModal(true);
                              }}
                            >
                              Agendar
                            </Button>
                          </div>
                        );
                      })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="relatorios">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Relatórios Disponíveis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownloadRelatorio("Inventário Completo")}
                    >
                      <span>Inventário Completo</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownloadRelatorio("Controle Patrimonial por Local")}
                    >
                      <span>Controle Patrimonial por Local</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownloadRelatorio("Cronograma de Manutenções")}
                    >
                      <span>Cronograma de Manutenções</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownloadRelatorio("Relatório de Depreciação")}
                    >
                      <span>Relatório de Depreciação</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <NovoPatrimonioModal open={showNovoModal} onOpenChange={setShowNovoModal} />
        <EditarPatrimonioModal open={showEditarModal} onOpenChange={setShowEditarModal} item={selectedItem} />
        <VisualizarPatrimonioModal open={showVisualizarModal} onOpenChange={setShowVisualizarModal} item={selectedItem} />
        <AgendarManutencaoModal 
          open={showAgendarModal} 
          onOpenChange={setShowAgendarModal} 
          patrimonio={selectedItem} 
        />
        <FiltroPatrimonioModal 
          open={showFiltroModal} 
          onOpenChange={setShowFiltroModal}
          onApplyFilter={applyFilters}
          currentFilters={filtros}
        />
        <InventarioModal 
          open={showInventarioModal} 
          onOpenChange={setShowInventarioModal}
          patrimonio={mockPatrimonio}
        />
      </div>
    </div>
  );
};

export default Patrimonio;