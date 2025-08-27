import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Plus, 
  Search, 
  Download,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare
} from "lucide-react";

const boletos = [
  {
    id: 1,
    morador: "João Silva",
    apartamento: "Apt 301",
    valor: 850.00,
    vencimento: "2024-01-15",
    status: "pago",
    protocolo: "BOL001234"
  },
  {
    id: 2,
    morador: "Maria Santos",
    apartamento: "Apt 205",
    valor: 850.00,
    vencimento: "2024-01-15",
    status: "pendente",
    protocolo: "BOL001235"
  },
  {
    id: 3,
    morador: "Carlos Oliveira",
    apartamento: "Apt 102",
    valor: 850.00,
    vencimento: "2024-01-10",
    status: "vencido",
    protocolo: "BOL001236"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pago":
      return <Badge className="bg-success/10 text-success border-success/20">Pago</Badge>;
    case "pendente":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
    case "vencido":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Vencido</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pago":
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "pendente":
      return <Clock className="w-4 h-4 text-warning" />;
    case "vencido":
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const Financeiro = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [buscaTexto, setBuscaTexto] = useState("");
  const [novaCobrancaOpen, setNovaCobrancaOpen] = useState(false);
  const [relatorioOpen, setRelatorioOpen] = useState(false);
  const [detalhesOpen, setDetalhesOpen] = useState(false);
  const [boleteSelecionado, setBoletoSelecionado] = useState<typeof boletos[0] | null>(null);
  const { toast } = useToast();

  // Filtrar boletos baseado no status e busca
  const boletosFiltrados = boletos.filter(boleto => {
    const passaFiltroStatus = filtroStatus === "todos" || boleto.status === filtroStatus;
    const passaBusca = buscaTexto === "" || 
      boleto.morador.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      boleto.apartamento.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      boleto.protocolo.toLowerCase().includes(buscaTexto.toLowerCase());
    
    return passaFiltroStatus && passaBusca;
  });

  const handleNovaCobranca = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui salvaria no banco de dados
    toast({
      title: "Cobrança criada com sucesso!",
      description: "A nova cobrança foi adicionada ao sistema."
    });
    setNovaCobrancaOpen(false);
  };

  const handleGerarRelatorio = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui geraria o relatório
    toast({
      title: "Relatório gerado!",
      description: "O relatório foi gerado e está sendo baixado."
    });
    setRelatorioOpen(false);
  };

  const handleEncaminharCobranca = (boleto: typeof boletos[0]) => {
    // Aqui implementaria o encaminhamento via WhatsApp/Email
    toast({
      title: "Cobrança encaminhada!",
      description: `Cobrança do ${boleto.morador} foi encaminhada via WhatsApp.`
    });
  };

  const handleVerDetalhes = (boleto: typeof boletos[0]) => {
    setBoletoSelecionado(boleto);
    setDetalhesOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestão Financeira
            </h1>
            <p className="text-muted-foreground mt-1">
              Controle de boletos, cobranças e inadimplência
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={relatorioOpen} onOpenChange={setRelatorioOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Relatório
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Gerar Relatório Financeiro</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleGerarRelatorio} className="space-y-4">
                  <div>
                    <Label htmlFor="tipo-relatorio">Tipo de Relatório</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financeiro">Relatório Financeiro</SelectItem>
                        <SelectItem value="inadimplencia">Relatório de Inadimplência</SelectItem>
                        <SelectItem value="arrecadacao">Relatório de Arrecadação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="data-inicio">Data Início</Label>
                      <Input type="date" id="data-inicio" />
                    </div>
                    <div>
                      <Label htmlFor="data-fim">Data Fim</Label>
                      <Input type="date" id="data-fim" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="formato">Formato</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                      <FileText className="w-4 h-4 mr-2" />
                      Gerar Relatório
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setRelatorioOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={novaCobrancaOpen} onOpenChange={setNovaCobrancaOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground shadow-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Cobrança
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Nova Cobrança</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleNovaCobranca} className="space-y-4">
                  <div>
                    <Label htmlFor="morador">Morador</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o morador" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joao">João Silva - Apt 301</SelectItem>
                        <SelectItem value="maria">Maria Santos - Apt 205</SelectItem>
                        <SelectItem value="carlos">Carlos Oliveira - Apt 102</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condominio">Condomínio</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o condomínio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aurora">Residencial Aurora</SelectItem>
                        <SelectItem value="jardins">Condomínio Jardins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valor">Valor (R$)</Label>
                      <Input type="number" step="0.01" placeholder="850.00" />
                    </div>
                    <div>
                      <Label htmlFor="vencimento">Vencimento</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea placeholder="Observações adicionais..." />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Cobrança
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setNovaCobrancaOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPIs Financeiros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagos</p>
                <p className="text-2xl font-bold text-success">R$ 25.5k</p>
                <p className="text-sm text-muted-foreground">73% do total</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-warning">R$ 6.8k</p>
                <p className="text-sm text-muted-foreground">19% do total</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vencidos</p>
                <p className="text-2xl font-bold text-destructive">R$ 2.7k</p>
                <p className="text-sm text-muted-foreground">8% do total</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">R$ 35.0k</p>
                <p className="text-sm text-muted-foreground">Este mês</p>
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
                placeholder="Buscar por morador, apartamento ou protocolo..."
                className="pl-10"
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filtroStatus === "todos" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("todos")}
              >
                Todos
              </Button>
              <Button 
                variant={filtroStatus === "pago" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("pago")}
              >
                Pagos
              </Button>
              <Button 
                variant={filtroStatus === "pendente" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("pendente")}
              >
                Pendentes
              </Button>
              <Button 
                variant={filtroStatus === "vencido" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("vencido")}
              >
                Vencidos
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista de Boletos */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">
              Boletos e Cobranças
            </h3>
          </div>
          
          <div className="divide-y divide-border/50">
            {boletosFiltrados.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum boleto encontrado para os filtros selecionados.</p>
              </div>
            ) : (
              boletosFiltrados.map((boleto) => (
              <div key={boleto.id} className="p-6 hover:bg-muted/20 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(boleto.status)}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-foreground">
                          {boleto.morador}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {boleto.apartamento}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Protocolo: {boleto.protocolo} • Vencimento: {boleto.vencimento}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">
                        R$ {boleto.valor.toFixed(2).replace('.', ',')}
                      </p>
                      {getStatusBadge(boleto.status)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVerDetalhes(boleto)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEncaminharCobranca(boleto)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </Card>

        {/* Modal de Detalhes */}
        <Dialog open={detalhesOpen} onOpenChange={setDetalhesOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Detalhes da Cobrança</DialogTitle>
            </DialogHeader>
            {boleteSelecionado && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Morador</Label>
                    <p className="text-foreground font-medium">{boleteSelecionado.morador}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Apartamento</Label>
                    <p className="text-foreground">{boleteSelecionado.apartamento}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Valor</Label>
                    <p className="text-foreground font-bold text-lg">
                      R$ {boleteSelecionado.valor.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(boleteSelecionado.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Vencimento</Label>
                    <p className="text-foreground">{boleteSelecionado.vencimento}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Protocolo</Label>
                    <p className="text-foreground font-mono">{boleteSelecionado.protocolo}</p>
                  </div>
                </div>
                
                {boleteSelecionado.status === "vencido" && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <p className="font-medium text-destructive">Cobrança Vencida</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Esta cobrança está em atraso. Considere entrar em contato com o morador.
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    className="bg-gradient-primary text-primary-foreground"
                    onClick={() => handleEncaminharCobranca(boleteSelecionado)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Encaminhar Cobrança
                  </Button>
                  <Button variant="outline" onClick={() => setDetalhesOpen(false)}>
                    Fechar
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

export default Financeiro;