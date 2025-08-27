import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Plus, Search, Filter, Upload, Eye, Edit, Calendar, AlertTriangle, CheckCircle2, Clock, Shield, FileCheck, Bell, Trash2, FileDown } from "lucide-react";
import { useState } from "react";
import NovaCertificacaoModal from "@/components/modals/NovaCertificacaoModal";
import VisualizarCertificacaoModal from "@/components/modals/VisualizarCertificacaoModal";
import EditarCertificacaoModal from "@/components/modals/EditarCertificacaoModal";
import ConfirmarExclusaoModal from "@/components/modals/ConfirmarExclusaoModal";
import RenovarDocumentoModal from "@/components/modals/RenovarDocumentoModal";
import { GerarRelatorioModal } from "@/components/modals/GerarRelatorioModal";
import { useToast } from "@/hooks/use-toast";
import { Certificacao } from "@/contexts/DataContext";

const Certificacoes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  
  // Controle dos modais
  const [novaCertificacaoModal, setNovaCertificacaoModal] = useState(false);
  const [visualizarModal, setVisualizarModal] = useState(false);
  const [editarModal, setEditarModal] = useState(false);
  const [excluirModal, setExcluirModal] = useState(false);
  const [renovarModal, setRenovarModal] = useState(false);
  const [relatorioModal, setRelatorioModal] = useState(false);
  const [certificacaoSelecionada, setCertificacaoSelecionada] = useState<any>(null);

  const mockCertificacoes = [
    {
      id: 1,
      tipo: "Alvará de Funcionamento",
      categoria: "Alvarás",
      orgaoEmissor: "Prefeitura Municipal",
      numeroDocumento: "ALV-2024-001234",
      dataEmissao: "2024-02-15",
      dataVencimento: "2025-02-15",
      status: "ativo",
      diasParaVencer: 180,
      valorRenovacao: 850,
      responsavel: "João Silva",
      observacoes: "Renovação automática"
    },
    {
      id: 2,
      tipo: "Seguro Incêndio",
      categoria: "Seguros",
      orgaoEmissor: "Seguradora Brasil",
      numeroDocumento: "SEG-2024-5678",
      dataEmissao: "2024-01-01",
      dataVencimento: "2024-12-31",
      status: "vencendo",
      diasParaVencer: 25,
      valorRenovacao: 2500,
      responsavel: "Maria Santos",
      observacoes: "Cobertura para incêndio e raio"
    },
    {
      id: 3,
      tipo: "Certificado Elevador A",
      categoria: "Equipamentos",
      orgaoEmissor: "CREA-SP",
      numeroDocumento: "ELEV-2024-0001",
      dataEmissao: "2024-06-01",
      dataVencimento: "2025-06-01",
      status: "ativo",
      diasParaVencer: 240,
      valorRenovacao: 450,
      responsavel: "Carlos Lima",
      observacoes: "Inspeção técnica anual"
    },
    {
      id: 4,
      tipo: "Licença de Instalação GLP",
      categoria: "Licenças",
      orgaoEmissor: "Corpo de Bombeiros",
      numeroDocumento: "GLP-2023-9999",
      dataEmissao: "2023-08-15",
      dataVencimento: "2024-08-15",
      status: "vencido",
      diasParaVencer: -10,
      valorRenovacao: 300,
      responsavel: "Ana Costa",
      observacoes: "Central de GLP - Renovação urgente"
    }
  ];

  const tiposDocumento = [
    { nome: "Alvarás", count: 1, icon: "🏛️", cor: "primary" },
    { nome: "Seguros", count: 1, icon: "🛡️", cor: "success" },
    { nome: "Equipamentos", count: 1, icon: "⚙️", cor: "warning" },
    { nome: "Licenças", count: 1, icon: "📜", cor: "accent" },
    { nome: "Atas", count: 0, icon: "📋", cor: "secondary" },
    { nome: "Outros", count: 0, icon: "📁", cor: "secondary" }
  ];

  const getStatusBadge = (status: string, dias: number) => {
    if (status === "vencido" || dias < 0) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Vencido</Badge>;
    }
    if (status === "vencendo" || dias <= 30) {
      return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3" />Vencendo</Badge>;
    }
    return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
  };

  const getPrioridadeAlerta = (dias: number) => {
    if (dias < 0) return "URGENTE";
    if (dias <= 15) return "ALTA";
    if (dias <= 30) return "MÉDIA";
    return "BAIXA";
  };

  // Funções para ações
  const handleVisualizar = (certificacao: any) => {
    setCertificacaoSelecionada(certificacao);
    setVisualizarModal(true);
  };

  const handleEditar = (certificacao: any) => {
    setCertificacaoSelecionada(certificacao);
    setEditarModal(true);
  };

  const handleExcluir = (certificacao: any) => {
    setCertificacaoSelecionada(certificacao);
    setExcluirModal(true);
  };

  const handleRenovar = (certificacao: any) => {
    setCertificacaoSelecionada(certificacao);
    setRenovarModal(true);
  };

  const handleDownload = (certificacao: any) => {
    toast({
      title: "Download iniciado",
      description: `Baixando certificado ${certificacao.tipo}...`,
    });
    console.log('Download da certificação:', certificacao.id);
  };

  const handleConfirmarExclusao = () => {
    toast({
      title: "Certificação excluída",
      description: "A certificação foi removida com sucesso.",
    });
    setExcluirModal(false);
    setCertificacaoSelecionada(null);
  };

  const handleFiltroCategoria = (categoria: string) => {
    setFiltroCategoria(categoria === filtroCategoria ? "" : categoria);
  };

  const filteredCertificacoes = mockCertificacoes.filter(cert => {
    const matchesSearch = cert.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.orgaoEmissor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = !filtroCategoria || cert.categoria === filtroCategoria;
    
    return matchesSearch && matchesCategoria;
  });

  const alertasVencimento = mockCertificacoes.filter(cert => cert.diasParaVencer <= 60);

  // Contadores dinâmicos para tipos de documento
  const tiposDocumentoComContador = tiposDocumento.map(tipo => ({
    ...tipo,
    count: mockCertificacoes.filter(cert => cert.categoria === tipo.nome).length
  }));

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentação e Certificações</h1>
            <p className="text-muted-foreground mt-1">Controle de documentos obrigatórios e certificações</p>
          </div>
          <Button className="gap-2" onClick={() => setNovaCertificacaoModal(true)}>
            <Plus className="w-4 h-4" />
            Nova Certificação
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificações Ativas</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Vencendo</p>
                  <p className="text-2xl font-bold text-warning">1</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidas</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Custo Renovação</p>
                  <p className="text-2xl font-bold text-primary">R$ 4.100</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tipos de Documento */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Tipos de Documento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Botão "Todos" */}
              <Button
                variant={!filtroCategoria ? "default" : "ghost"}
                className="w-full justify-start mb-3"
                onClick={() => setFiltroCategoria("")}
              >
                <span className="text-lg mr-3">📋</span>
                Todos
                <Badge variant="secondary" className="ml-auto">
                  {mockCertificacoes.length}
                </Badge>
              </Button>
              
              {tiposDocumentoComContador.map((tipo) => (
                <Button
                  key={tipo.nome}
                  variant={filtroCategoria === tipo.nome ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleFiltroCategoria(tipo.nome)}
                >
                  <span className="text-lg mr-3">{tipo.icon}</span>
                  {tipo.nome}
                  <Badge variant="secondary" className="ml-auto">
                    {tipo.count}
                  </Badge>
                </Button>
              ))}
              
              {/* Alertas em Destaque */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-warning" />
                  <span className="font-medium text-sm">Alertas Ativos</span>
                </div>
                <div className="space-y-2">
                  {alertasVencimento.slice(0, 3).map((cert) => (
                    <div key={cert.id} className="p-2 bg-warning/10 rounded border border-warning/20">
                      <p className="text-xs font-medium">{cert.tipo}</p>
                      <p className="text-xs text-muted-foreground">
                        {cert.diasParaVencer < 0 
                          ? `Vencido há ${Math.abs(cert.diasParaVencer)} dias`
                          : `${cert.diasParaVencer} dias`
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Certificações */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filtros e Busca */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar certificações..."
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
                      Documentos
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="lista" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="lista">Certificações</TabsTrigger>
                <TabsTrigger value="alertas">Alertas</TabsTrigger>
                <TabsTrigger value="calendario">Calendário</TabsTrigger>
                <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              </TabsList>

              <TabsContent value="lista">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo de Documento</TableHead>
                          <TableHead>Número</TableHead>
                          <TableHead>Órgão Emissor</TableHead>
                          <TableHead>Emissão</TableHead>
                          <TableHead>Vencimento</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Renovação</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCertificacoes.map((cert) => (
                          <TableRow key={cert.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{cert.tipo}</p>
                                <Badge variant="outline" className="text-xs mt-1">{cert.categoria}</Badge>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{cert.numeroDocumento}</TableCell>
                            <TableCell>{cert.orgaoEmissor}</TableCell>
                            <TableCell>{new Date(cert.dataEmissao).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                {new Date(cert.dataVencimento).toLocaleDateString('pt-BR')}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(cert.status, cert.diasParaVencer)}</TableCell>
                            <TableCell>R$ {cert.valorRenovacao.toLocaleString('pt-BR')}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleVisualizar(cert)}
                                  title="Visualizar certificação"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDownload(cert)}
                                  title="Baixar PDF"
                                >
                                  <FileDown className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditar(cert)}
                                  title="Editar certificação"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleExcluir(cert)}
                                  title="Excluir certificação"
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
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

              <TabsContent value="alertas">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Alertas de Vencimento e Renovação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alertasVencimento.map(cert => {
                      const prioridade = getPrioridadeAlerta(cert.diasParaVencer);
                      const corPrioridade = {
                        'URGENTE': 'destructive',
                        'ALTA': 'destructive',
                        'MÉDIA': 'secondary',
                        'BAIXA': 'outline'
                      }[prioridade] as any;

                      return (
                        <div key={cert.id} className="flex items-center justify-between p-4 bg-warning/10 rounded-lg border border-warning/20">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-warning" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{cert.tipo}</p>
                                <Badge variant={corPrioridade} className="text-xs">
                                  {prioridade}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {cert.diasParaVencer < 0 
                                  ? `Vencido há ${Math.abs(cert.diasParaVencer)} dias - Renovação urgente`
                                  : `Vence em ${cert.diasParaVencer} dias`
                                }
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Custo de renovação: R$ {cert.valorRenovacao.toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRenovar(cert)}
                            >
                              Renovar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast({
                                title: "Lembrete configurado",
                                description: "Você será notificado sobre o vencimento.",
                              })}
                            >
                              Lembrete
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendario">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Calendário de Vencimentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockCertificacoes.map((cert) => (
                        <div key={cert.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">{cert.categoria}</Badge>
                            {getStatusBadge(cert.status, cert.diasParaVencer)}
                          </div>
                          <h4 className="font-medium mb-1">{cert.tipo}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{cert.orgaoEmissor}</p>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(cert.dataVencimento).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      ))}
                    </div>
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
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2"
                        onClick={() => setRelatorioModal(true)}
                      >
                        <FileDown className="w-4 h-4" />
                        Controle de Vencimentos
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2"
                        onClick={() => setRelatorioModal(true)}
                      >
                        <FileDown className="w-4 h-4" />
                        Histórico de Renovações
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2"
                        onClick={() => setRelatorioModal(true)}
                      >
                        <FileDown className="w-4 h-4" />
                        Custos de Certificações
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2"
                        onClick={() => setRelatorioModal(true)}
                      >
                        <FileDown className="w-4 h-4" />
                        Conformidade Legal
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modais */}
      <NovaCertificacaoModal
        open={novaCertificacaoModal}
        onOpenChange={setNovaCertificacaoModal}
      />

      <VisualizarCertificacaoModal
        open={visualizarModal}
        onOpenChange={setVisualizarModal}
        certificacao={certificacaoSelecionada}
      />

      <EditarCertificacaoModal
        open={editarModal}
        onOpenChange={setEditarModal}
        certificacao={certificacaoSelecionada}
      />

      <ConfirmarExclusaoModal
        open={excluirModal}
        onOpenChange={setExcluirModal}
        title="Excluir Certificação"
        description={`Tem certeza que deseja excluir a certificação "${certificacaoSelecionada?.tipo}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmarExclusao}
      />

      <RenovarDocumentoModal
        open={renovarModal}
        onOpenChange={setRenovarModal}
        documento={certificacaoSelecionada}
      />

      <GerarRelatorioModal
        open={relatorioModal}
        onOpenChange={setRelatorioModal}
      />
    </div>
  );
};

export default Certificacoes;