import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Plus, Search, Filter, Upload, Eye, Edit, Phone, Mail, MapPin, Truck, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import NovoFornecedorModal from "@/components/modals/NovoFornecedorModal";
import VisualizarFornecedorModal from "@/components/modals/VisualizarFornecedorModal";
import EditarFornecedorModal from "@/components/modals/EditarFornecedorModal";
import ConfirmarExclusaoModal from "@/components/modals/ConfirmarExclusaoModal";

const Fornecedores = () => {
  const { toast } = useToast();
  const { state, dispatch } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNovoFornecedorModal, setShowNovoFornecedorModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

  const handleVisualizarFornecedor = (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setShowVisualizarModal(true);
  };

  const handleEditarFornecedor = (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setShowEditarModal(true);
  };

  const handleExcluirFornecedor = (fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setShowExcluirModal(true);
  };

  const confirmarExclusao = () => {
    if (fornecedorSelecionado) {
      dispatch({ type: 'DELETE_FORNECEDOR', payload: fornecedorSelecionado.id });
      toast({
        title: "Fornecedor excluído!",
        description: "O fornecedor foi removido com sucesso.",
      });
      setShowExcluirModal(false);
      setFornecedorSelecionado(null);
    }
  };

  const mockFornecedores = [
    {
      id: 1,
      nome: "Elevadores Tech LTDA",
      cnpj: "12.345.678/0001-90",
      contato: "João Santos",
      telefone: "(11) 9999-8888",
      email: "contato@elevadorestech.com.br",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      areaServico: "Manutenção de Elevadores",
      avaliacaoMedia: 4.8,
      totalServicos: 15,
      valorTotal: 45000,
      ultimoServico: "2024-08-15",
      status: "ativo"
    },
    {
      id: 2,
      nome: "Limpeza Total S.A.",
      cnpj: "98.765.432/0001-10",
      contato: "Maria Silva",
      telefone: "(11) 8888-7777",
      email: "maria@limpezatotal.com.br",
      endereco: "Av. Principal, 456 - São Paulo/SP",
      areaServico: "Limpeza e Conservação",
      avaliacaoMedia: 4.5,
      totalServicos: 8,
      valorTotal: 25000,
      ultimoServico: "2024-08-20",
      status: "ativo"
    },
    {
      id: 3,
      nome: "Segurança Plus",
      cnpj: "11.222.333/0001-44",
      contato: "Carlos Lima",
      telefone: "(11) 7777-6666",
      email: "carlos@segurancaplus.com.br",
      endereco: "Rua da Segurança, 789 - São Paulo/SP",
      areaServico: "Segurança e Portaria",
      avaliacaoMedia: 4.2,
      totalServicos: 12,
      valorTotal: 60000,
      ultimoServico: "2024-08-18",
      status: "inativo"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}`}
      />
    ));
  };

  const filteredFornecedores = state.fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.areaServico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cnpj.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Fornecedores</h1>
            <p className="text-muted-foreground mt-1">Cadastro e avaliação de fornecedores parceiros</p>
          </div>
          <Button className="gap-2" onClick={() => setShowNovoFornecedorModal(true)}>
            <Plus className="w-4 h-4" />
            Novo Fornecedor
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fornecedores Ativos</p>
                  <p className="text-2xl font-bold text-success">2</p>
                </div>
                <Truck className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avaliação Média</p>
                  <p className="text-2xl font-bold text-warning">4.5</p>
                </div>
                <Star className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Serviços</p>
                  <p className="text-2xl font-bold text-primary">35</p>
                </div>
                <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center">35</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold text-success">R$ 130.000</p>
                </div>
                <span className="text-2xl">💰</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CNPJ ou área de serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Import/Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="lista" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lista">Lista de Fornecedores</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFornecedores.map((fornecedor) => (
                <Card key={fornecedor.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elegant transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${fornecedor.nome}`} />
                          <AvatarFallback>{fornecedor.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{fornecedor.nome}</h3>
                          <p className="text-sm text-muted-foreground">{fornecedor.areaServico}</p>
                        </div>
                      </div>
                      <Badge variant={fornecedor.status === 'ativo' ? 'default' : 'secondary'}>
                        {fornecedor.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{fornecedor.telefone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{fornecedor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{fornecedor.endereco}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        {renderStars(fornecedor.avaliacaoMedia)}
                        <span className="text-sm font-medium ml-1">{fornecedor.avaliacaoMedia}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{fornecedor.totalServicos} serviços</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleVisualizarFornecedor(fornecedor)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditarFornecedor(fornecedor)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExcluirFornecedor(fornecedor)}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="avaliacoes">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Histórico de Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Qualidade</TableHead>
                      <TableHead>Pontualidade</TableHead>
                      <TableHead>Custo-Benefício</TableHead>
                      <TableHead>Média</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Elevadores Tech</TableCell>
                      <TableCell>Manutenção preventiva</TableCell>
                      <TableCell>15/08/2024</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(5)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(4)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(5)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-success/20 text-success border-success/30">4.7</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Relatórios Disponíveis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Performance de Fornecedores
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Histórico de Serviços
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Análise de Custos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Ranking de Avaliações
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tempo médio de resposta</span>
                    <span className="font-medium">2.5 horas</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Taxa de satisfação</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fornecedores certificados</span>
                    <span className="font-medium">67%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <NovoFornecedorModal 
        open={showNovoFornecedorModal} 
        onOpenChange={setShowNovoFornecedorModal} 
      />
      
      <VisualizarFornecedorModal
        open={showVisualizarModal}
        onOpenChange={setShowVisualizarModal}
        fornecedor={fornecedorSelecionado}
      />
      
      <EditarFornecedorModal
        open={showEditarModal}
        onOpenChange={setShowEditarModal}
        fornecedor={fornecedorSelecionado}
      />
      
      <ConfirmarExclusaoModal
        open={showExcluirModal}
        onOpenChange={setShowExcluirModal}
        title="Excluir Fornecedor"
        description={`Tem certeza que deseja excluir o fornecedor "${fornecedorSelecionado?.nome}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmarExclusao}
      />
    </div>
  );
};

export default Fornecedores;