import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Plus, Search, Filter, Upload, Eye, Edit, Download, Share, Calendar, FolderOpen, AlertTriangle, Trash2, FileText, RotateCcw, Settings } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import NovoDocumentoModal from "@/components/modals/NovoDocumentoModal";
import VisualizarDocumentoModal from "@/components/modals/VisualizarDocumentoModal";
import EditarDocumentoModal from "@/components/modals/EditarDocumentoModal";
import RenovarDocumentoModal from "@/components/modals/RenovarDocumentoModal";
import GerenciarCompartilhamentoModal from "@/components/modals/GerenciarCompartilhamentoModal";
import FiltroDocumentosModal from "@/components/modals/FiltroDocumentosModal";
import RelatorioDocumentosModal from "@/components/modals/RelatorioDocumentosModal";
import ConfirmarExclusaoModal from "@/components/modals/ConfirmarExclusaoModal";

const Documentos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState({});
  const [showNovoDocumentoModal, setShowNovoDocumentoModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showRenovarModal, setShowRenovarModal] = useState(false);
  const [showGerenciarModal, setShowGerenciarModal] = useState(false);
  const [showFiltroModal, setShowFiltroModal] = useState(false);
  const [showRelatorioModal, setShowRelatorioModal] = useState(false);
  const [showConfirmarExclusaoModal, setShowConfirmarExclusaoModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const mockDocumentos = [
    {
      id: 1,
      nome: "Ata da Assembleia - Janeiro 2024",
      categoria: "Atas",
      tipo: "PDF",
      tamanho: "2.4 MB",
      dataUpload: "2024-01-15",
      dataVencimento: null,
      uploadedBy: "João Silva",
      responsavel: "João Silva",
      status: "ativo",
      compartilhado: true,
      downloads: 12,
      descricao: "Ata da assembleia ordinária de janeiro",
      tags: "assembleia, janeiro, 2024"
    },
    {
      id: 2,
      nome: "Alvará de Funcionamento",
      categoria: "Licenças",
      tipo: "PDF",
      tamanho: "1.8 MB",
      dataUpload: "2024-02-10",
      dataVencimento: "2025-02-10",
      uploadedBy: "Maria Santos",
      responsavel: "Maria Santos",
      status: "vencendo",
      compartilhado: false,
      downloads: 5,
      descricao: "Alvará de funcionamento do condomínio",
      tags: "alvará, funcionamento, licença"
    },
    {
      id: 3,
      nome: "Contrato - Elevadores Tech",
      categoria: "Contratos",
      tipo: "PDF",
      tamanho: "3.2 MB",
      dataUpload: "2024-01-20",
      dataVencimento: "2025-01-20",
      uploadedBy: "Carlos Lima",
      responsavel: "Carlos Lima",
      status: "ativo",
      compartilhado: true,
      downloads: 8,
      descricao: "Contrato de manutenção dos elevadores",
      tags: "contrato, elevadores, manutenção"
    },
    {
      id: 4,
      nome: "Apólice de Seguro",
      categoria: "Seguros",
      tipo: "PDF",
      tamanho: "1.5 MB",
      dataUpload: "2024-03-01",
      dataVencimento: "2024-12-31",
      uploadedBy: "Ana Costa",
      responsavel: "Ana Costa",
      status: "vencendo",
      compartilhado: false,
      downloads: 3,
      descricao: "Apólice de seguro predial",
      tags: "seguro, apólice, predial"
    }
  ];

  const categorias = [
    { nome: "Atas", icon: "📋" },
    { nome: "Licenças", icon: "📜" },
    { nome: "Contratos", icon: "📄" },
    { nome: "Seguros", icon: "🛡️" },
    { nome: "Alvarás", icon: "🏛️" },
    { nome: "Outros", icon: "📁" }
  ];

  // Calcular contadores dinamicamente
  const getCategoryCount = (categoriaNome: string) => {
    return mockDocumentos.filter(doc => doc.categoria === categoriaNome).length;
  };

  const getStatusBadge = (status: string, dataVencimento: string | null) => {
    if (dataVencimento) {
      const hoje = new Date();
      const vencimento = new Date(dataVencimento);
      const diasRestantes = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
      
      if (diasRestantes < 0) {
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Vencido</Badge>;
      }
      if (diasRestantes <= 30) {
        return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Calendar className="w-3 h-3" />Vence em {diasRestantes}d</Badge>;
      }
    }
    return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30">Ativo</Badge>;
  };

  const handleDownload = (documento: any) => {
    // Simular download do PDF
    const link = document.createElement('a');
    link.href = `#documento-${documento.id}.pdf`; // Em produção seria a URL real do arquivo
    link.download = `${documento.nome}.pdf`;
    link.target = '_blank';
    
    // Simular o clique
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: `Baixando ${documento.nome}...`,
    });
    
    console.log('Download do documento:', documento.id);
  };

  const handleDelete = (documento: any) => {
    setSelectedDoc(documento);
    setShowConfirmarExclusaoModal(true);
  };

  const confirmDelete = () => {
    toast({
      title: "Documento excluído",
      description: "O documento foi removido com sucesso",
      variant: "destructive",
    });
    console.log('Excluindo documento:', selectedDoc?.id);
    setShowConfirmarExclusaoModal(false);
    setSelectedDoc(null);
  };

  const handleCategoryFilter = (categoria: string) => {
    setSelectedCategory(categoria === selectedCategory ? "" : categoria);
  };

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredDocumentos = mockDocumentos.filter(doc => {
    let matches = true;
    
    // Filtro por categoria selecionada
    if (selectedCategory && doc.categoria !== selectedCategory) {
      matches = false;
    }
    
    // Filtro por termo de busca
    if (searchTerm && !(
      doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.responsavel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      matches = false;
    }
    
    // Aplicar filtros avançados
    if (filters && Object.keys(filters).length > 0) {
      const f = filters as any;
      
      // Filtro por categoria (se vier dos filtros avançados)
      if (f.categoria && f.categoria !== doc.categoria) {
        matches = false;
      }
      
      // Filtro por responsável
      if (f.responsavel && !doc.responsavel?.toLowerCase().includes(f.responsavel.toLowerCase())) {
        matches = false;
      }
      
      // Filtro por status
      if (f.status && f.status.length > 0 && !f.status.includes(doc.status)) {
        matches = false;
      }
      
      // Filtro por compartilhamento
      if (f.compartilhado !== null && f.compartilhado !== doc.compartilhado) {
        matches = false;
      }
      
      // Filtro por data de upload
      if (f.dataUploadInicio) {
        const dataDoc = new Date(doc.dataUpload);
        const dataInicio = new Date(f.dataUploadInicio);
        if (dataDoc < dataInicio) {
          matches = false;
        }
      }
      
      if (f.dataUploadFim) {
        const dataDoc = new Date(doc.dataUpload);
        const dataFim = new Date(f.dataUploadFim);
        if (dataDoc > dataFim) {
          matches = false;
        }
      }
      
      // Filtro por data de vencimento
      if (f.dataVencimentoInicio && doc.dataVencimento) {
        const dataDoc = new Date(doc.dataVencimento);
        const dataInicio = new Date(f.dataVencimentoInicio);
        if (dataDoc < dataInicio) {
          matches = false;
        }
      }
      
      if (f.dataVencimentoFim && doc.dataVencimento) {
        const dataDoc = new Date(doc.dataVencimento);
        const dataFim = new Date(f.dataVencimentoFim);
        if (dataDoc > dataFim) {
          matches = false;
        }
      }
    }
    
    return matches;
  });

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Documentos</h1>
            <p className="text-muted-foreground mt-1">Arquivo digital e controle documental centralizado</p>
          </div>
          <Button className="gap-2" onClick={() => setShowNovoDocumentoModal(true)}>
            <Plus className="w-4 h-4" />
            Upload Documento
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Documentos</p>
                  <p className="text-2xl font-bold text-primary">4</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compartilhados</p>
                  <p className="text-2xl font-bold text-success">2</p>
                </div>
                <Share className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencendo</p>
                  <p className="text-2xl font-bold text-warning">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold text-accent">28</p>
                </div>
                <Download className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categorias */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-smooth ${
                  selectedCategory === "" ? "bg-primary/20 border border-primary/30" : "bg-muted/30 hover:bg-muted/50"
                }`}
                onClick={() => handleCategoryFilter("")}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📁</span>
                  <span className="font-medium">Todos os Documentos</span>
                </div>
                <Badge variant={selectedCategory === "" ? "default" : "secondary"}>
                  {mockDocumentos.length}
                </Badge>
              </div>
              {categorias.map((categoria) => (
                <div 
                  key={categoria.nome} 
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-smooth ${
                    selectedCategory === categoria.nome ? "bg-primary/20 border border-primary/30" : "bg-muted/30 hover:bg-muted/50"
                  }`}
                  onClick={() => handleCategoryFilter(categoria.nome)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{categoria.icon}</span>
                    <span className="font-medium">{categoria.nome}</span>
                  </div>
                  <Badge variant={selectedCategory === categoria.nome ? "default" : "secondary"}>
                    {getCategoryCount(categoria.nome)}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Lista de Documentos */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filtros e Busca */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar documentos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={Object.keys(filters).length > 0 ? "default" : "outline"} 
                      size="sm" 
                      className="gap-2" 
                      onClick={() => setShowFiltroModal(true)}
                    >
                      <Filter className="w-4 h-4" />
                      Filtros
                      {Object.keys(filters).length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {Object.keys(filters).length}
                        </Badge>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowRelatorioModal(true)}>
                      <FileText className="w-4 h-4" />
                      Relatórios
                    </Button>
                    {/* Botão para limpar filtros */}
                    {(Object.keys(filters).length > 0 || selectedCategory || searchTerm) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setFilters({});
                          setSelectedCategory("");
                          setSearchTerm("");
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Limpar filtros
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="lista" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lista">Lista de Documentos</TabsTrigger>
                <TabsTrigger value="alertas">Alertas de Vencimento</TabsTrigger>
                <TabsTrigger value="compartilhados">Compartilhados</TabsTrigger>
              </TabsList>

              <TabsContent value="lista">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Documento</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data Upload</TableHead>
                          <TableHead>Vencimento</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocumentos.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{doc.nome}</p>
                                <p className="text-sm text-muted-foreground">{doc.tamanho}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{doc.categoria}</Badge>
                            </TableCell>
                            <TableCell>{doc.tipo}</TableCell>
                            <TableCell>{new Date(doc.dataUpload).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              {doc.dataVencimento 
                                ? new Date(doc.dataVencimento).toLocaleDateString('pt-BR')
                                : '-'
                              }
                            </TableCell>
                            <TableCell>{getStatusBadge(doc.status, doc.dataVencimento)}</TableCell>
                            <TableCell>{doc.downloads}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => { setSelectedDoc(doc); setShowVisualizarModal(true); }} title="Visualizar">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)} title="Download">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => { setSelectedDoc(doc); setShowEditarModal(true); }} title="Editar">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(doc)} className="text-destructive hover:text-destructive" title="Excluir">
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
                    <CardTitle>Documentos com Vencimento Próximo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockDocumentos
                      .filter(doc => doc.dataVencimento && doc.status === 'vencendo')
                      .map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-warning/10 rounded-lg border border-warning/20">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-warning" />
                            <div>
                              <p className="font-medium">{doc.nome}</p>
                              <p className="text-sm text-muted-foreground">
                                Vence em {Math.ceil((new Date(doc.dataVencimento!).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} dias
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => { setSelectedDoc(doc); setShowRenovarModal(true); }} className="gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Renovar
                          </Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compartilhados">
                <Card className="bg-gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Documentos Compartilhados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDocumentos
                        .filter(doc => doc.compartilhado)
                        .map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                            <div className="flex items-center gap-3">
                              <Share className="w-5 h-5 text-success" />
                              <div>
                                <p className="font-medium">{doc.nome}</p>
                                <p className="text-sm text-muted-foreground">
                                  Compartilhado por {doc.uploadedBy} • {doc.downloads} downloads
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => { setSelectedDoc(doc); setShowGerenciarModal(true); }} className="gap-2">
                              <Settings className="w-4 h-4" />
                              Gerenciar
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <NovoDocumentoModal 
        open={showNovoDocumentoModal} 
        onOpenChange={setShowNovoDocumentoModal} 
      />
      <VisualizarDocumentoModal 
        open={showVisualizarModal} 
        onOpenChange={setShowVisualizarModal} 
        documento={selectedDoc} 
      />
      <EditarDocumentoModal 
        open={showEditarModal} 
        onOpenChange={setShowEditarModal} 
        documento={selectedDoc} 
      />
      <RenovarDocumentoModal 
        open={showRenovarModal} 
        onOpenChange={setShowRenovarModal} 
        documento={selectedDoc} 
      />
      <GerenciarCompartilhamentoModal 
        open={showGerenciarModal} 
        onOpenChange={setShowGerenciarModal} 
        documento={selectedDoc} 
      />
      <FiltroDocumentosModal 
        open={showFiltroModal} 
        onOpenChange={setShowFiltroModal} 
        onApplyFilters={applyFilters}
        currentFilters={filters}
      />
      <RelatorioDocumentosModal 
        open={showRelatorioModal} 
        onOpenChange={setShowRelatorioModal} 
      />
      <ConfirmarExclusaoModal 
        open={showConfirmarExclusaoModal} 
        onOpenChange={setShowConfirmarExclusaoModal} 
        onConfirm={confirmDelete}
        title="Excluir Documento"
        description={`Tem certeza que deseja excluir o documento "${selectedDoc?.nome}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  );
};

export default Documentos;