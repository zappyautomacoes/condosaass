import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileCheck, Plus, Search, AlertTriangle, CheckCircle2, Clock, Filter, Upload, Eye, Edit, Trash2, Download, FileText, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useData, Contrato } from "@/contexts/DataContext";
import NovoContratoModal from "@/components/modals/NovoContratoModal";
import VisualizarContratoModal from "@/components/modals/VisualizarContratoModal";
import EditarContratoModal from "@/components/modals/EditarContratoModal";
import RenovarContratoModal from "@/components/modals/RenovarContratoModal";
import ConfirmarExclusaoModal from "@/components/modals/ConfirmarExclusaoModal";

const Contratos = () => {
  const { state } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNovoContratoModal, setShowNovoContratoModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showRenovarModal, setShowRenovarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);

  const contratos = state.contratos;

  const getStatusBadge = (status: string, dias: number) => {
    if (status === "vencido" || dias < 0) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Vencido</Badge>;
    }
    if (status === "vencendo" || dias <= 30) {
      return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3" />Vencendo</Badge>;
    }
    return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
  };

  const filteredContratos = contratos.filter(contrato =>
    contrato.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contrato.servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contrato.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVisualizarContrato = (contrato: Contrato) => {
    setSelectedContrato(contrato);
    setShowVisualizarModal(true);
  };

  const handleEditarContrato = (contrato: Contrato) => {
    setSelectedContrato(contrato);
    setShowEditarModal(true);
  };

  const handleRenovarContrato = (contrato: Contrato) => {
    setSelectedContrato(contrato);
    setShowRenovarModal(true);
  };

  const handleExcluirContrato = (contrato: Contrato) => {
    setSelectedContrato(contrato);
    setShowExcluirModal(true);
  };

  const handleDownloadRelatorio = (tipo: string) => {
    // Simula download do relatório
    const blob = new Blob([`Relatório: ${tipo}\nData: ${new Date().toLocaleDateString('pt-BR')}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tipo.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Contratos</h1>
            <p className="text-muted-foreground mt-1">Controle completo de contratos e fornecedores</p>
          </div>
          <Button className="gap-2" onClick={() => setShowNovoContratoModal(true)}>
            <Plus className="w-4 h-4" />
            Novo Contrato
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contratos Ativos</p>
                  <p className="text-2xl font-bold text-success">
                    {contratos.filter(c => c.status === 'ativo').length}
                  </p>
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
                  <p className="text-2xl font-bold text-warning">
                    {contratos.filter(c => c.status === 'vencendo').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-bold text-destructive">
                    {contratos.filter(c => c.status === 'vencido').length}
                  </p>
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
                  <p className="text-2xl font-bold text-primary">
                    R$ {contratos.reduce((total, contrato) => total + contrato.valor, 0).toLocaleString('pt-BR')}
                  </p>
                </div>
                <FileCheck className="h-8 w-8 text-primary" />
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
                  placeholder="Buscar por fornecedor, serviço ou número..."
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
            <TabsTrigger value="lista">Lista de Contratos</TabsTrigger>
            <TabsTrigger value="alertas">Alertas de Vencimento</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="lista">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Contratos Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Início</TableHead>
                      <TableHead>Término</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContratos.map((contrato) => (
                      <TableRow key={contrato.id}>
                        <TableCell className="font-medium">{contrato.numero}</TableCell>
                        <TableCell>{contrato.fornecedor}</TableCell>
                        <TableCell>{contrato.servico}</TableCell>
                        <TableCell>{new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(contrato.dataTermino).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>R$ {contrato.valor.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>{getStatusBadge(contrato.status, contrato.diasParaVencer)}</TableCell>
                        <TableCell>{contrato.responsavel}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleVisualizarContrato(contrato)}
                              title="Visualizar"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditarContrato(contrato)}
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleExcluirContrato(contrato)}
                              title="Excluir"
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
                <CardTitle>Alertas de Vencimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contratos
                  .filter(c => c.diasParaVencer <= 30)
                  .map(contrato => (
                    <div key={contrato.id} className="flex items-center justify-between p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <div>
                          <p className="font-medium">{contrato.numero} - {contrato.fornecedor}</p>
                          <p className="text-sm text-muted-foreground">
                            {contrato.diasParaVencer < 0 
                              ? `Vencido há ${Math.abs(contrato.diasParaVencer)} dias`
                              : `Vence em ${contrato.diasParaVencer} dias`
                            }
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRenovarContrato(contrato)}
                        className="gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Renovar
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Relatórios de Contratos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Relatório de Contratos por Status</p>
                        <p className="text-sm text-muted-foreground">Lista completa por situação</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Contratos por Status PDF')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Contratos por Status Excel')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Relatório de Vencimentos</p>
                        <p className="text-sm text-muted-foreground">Contratos próximos ao vencimento</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Vencimentos PDF')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Vencimentos Excel')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Relatório Financeiro</p>
                        <p className="text-sm text-muted-foreground">Análise de custos por período</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Financeiro PDF')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Financeiro Excel')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Histórico de Renovações</p>
                        <p className="text-sm text-muted-foreground">Contratos renovados e histórico</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Renovações PDF')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadRelatorio('Renovações Excel')}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Excel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <NovoContratoModal 
        open={showNovoContratoModal} 
        onOpenChange={setShowNovoContratoModal} 
      />
      
      <VisualizarContratoModal
        open={showVisualizarModal}
        onOpenChange={setShowVisualizarModal}
        contrato={selectedContrato}
      />
      
      <EditarContratoModal
        open={showEditarModal}
        onOpenChange={setShowEditarModal}
        contrato={selectedContrato}
      />
      
      <RenovarContratoModal
        open={showRenovarModal}
        onOpenChange={setShowRenovarModal}
        contrato={selectedContrato}
      />
      
      <ConfirmarExclusaoModal
        open={showExcluirModal}
        onOpenChange={setShowExcluirModal}
        title="Excluir Contrato"
        description={`Tem certeza que deseja excluir o contrato ${selectedContrato?.numero}? Esta ação não pode ser desfeita.`}
        onConfirm={() => {
          if (selectedContrato) {
            // Implementar exclusão via dispatch quando integrar com Supabase
            console.log('Excluindo contrato:', selectedContrato.id);
          }
          setShowExcluirModal(false);
        }}
      />
    </div>
  );
};

export default Contratos;