import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GerarCobrancaModal } from "@/components/modals/GerarCobrancaModal";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Plus,
  Search,
  Calendar,
  AlertCircle,
  TrendingUp,
  Download,
  BarChart3
} from "lucide-react";

const cobrancas = [
  {
    id: 1,
    morador: "João Silva",
    apartamento: "Apt 301",
    bloco: "A",
    tipo: "Taxa de Condomínio",
    valor: 850.00,
    vencimento: "2024-02-15",
    status: "pendente",
    geradoEm: "2024-01-15"
  },
  {
    id: 2,
    morador: "Maria Santos",
    apartamento: "Apt 205", 
    bloco: "A",
    tipo: "Taxa Extraordinária",
    valor: 200.00,
    vencimento: "2024-02-20",
    status: "pago",
    geradoEm: "2024-01-20",
    pagoEm: "2024-02-18"
  },
  {
    id: 3,
    morador: "Carlos Oliveira",
    apartamento: "Apt 102",
    bloco: "B", 
    tipo: "Multa",
    valor: 150.00,
    vencimento: "2024-02-10",
    status: "vencido",
    geradoEm: "2024-01-10"
  }
];

const Cobranca = () => {
  const { toast } = useToast();
  const [cobrancasList, setCobrancasList] = useState(cobrancas);
  const [modalGerarCobranca, setModalGerarCobranca] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busca, setBusca] = useState("");

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

  const cobrancasFiltradas = cobrancasList.filter(cobranca => {
    const matchBusca = cobranca.morador.toLowerCase().includes(busca.toLowerCase()) ||
                      cobranca.apartamento.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === "todos" || cobranca.status === filtroStatus;
    const matchTipo = filtroTipo === "todos" || cobranca.tipo === filtroTipo;
    
    return matchBusca && matchStatus && matchTipo;
  });

  const totalGerado = cobrancasList.reduce((acc, item) => acc + item.valor, 0);
  const totalPago = cobrancasList.filter(item => item.status === "pago").reduce((acc, item) => acc + item.valor, 0);
  const totalPendente = cobrancasList.filter(item => item.status === "pendente").reduce((acc, item) => acc + item.valor, 0);
  const totalVencido = cobrancasList.filter(item => item.status === "vencido").reduce((acc, item) => acc + item.valor, 0);

  const reenviarBoleto = (cobranca: any) => {
    toast({
      title: "Boleto reenviado!",
      description: `Boleto de ${cobranca.morador} foi reenviado por e-mail.`,
    });
  };

  const marcarComoPago = (cobranca: any) => {
    setCobrancasList(prev => prev.map(item => 
      item.id === cobranca.id ? { ...item, status: "pago", pagoEm: new Date().toISOString().split('T')[0] } : item
    ));
    toast({
      title: "Pagamento registrado!",
      description: `Cobrança de ${cobranca.morador} marcada como paga.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sistema de Cobrança</h1>
            <p className="text-muted-foreground mt-1">Gestão de boletos, pagamentos e inadimplência</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatório
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-primary text-primary-foreground shadow-glow"
              onClick={() => setModalGerarCobranca(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Gerar Cobrança
            </Button>
          </div>
        </div>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Gerado</p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {totalGerado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pagos</p>
                  <p className="text-2xl font-bold text-success">
                    R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-warning">
                    R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-bold text-destructive">
                    R$ {totalVencido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por morador ou apartamento..."
                  className="pl-10"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Status</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Tipos</SelectItem>
                    <SelectItem value="Taxa de Condomínio">Taxa de Condomínio</SelectItem>
                    <SelectItem value="Taxa Extraordinária">Taxa Extraordinária</SelectItem>
                    <SelectItem value="Multa">Multa</SelectItem>
                    <SelectItem value="Taxa de Reserva">Taxa de Reserva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Cobranças */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Cobranças Geradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cobrancasFiltradas.map((cobranca) => (
                <div key={cobranca.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-smooth">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{cobranca.morador}</h3>
                        <Badge variant="outline">{cobranca.apartamento} - Bloco {cobranca.bloco}</Badge>
                        {getStatusBadge(cobranca.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Tipo</p>
                          <p className="font-medium">{cobranca.tipo}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Valor</p>
                          <p className="font-semibold text-primary">
                            R$ {cobranca.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vencimento</p>
                          <p className="font-medium">{cobranca.vencimento}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Gerado em</p>
                          <p className="font-medium">{cobranca.geradoEm}</p>
                        </div>
                      </div>

                      {cobranca.pagoEm && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Pago em: </span>
                          <span className="text-success font-medium">{cobranca.pagoEm}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cobranca.status !== "pago" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => reenviarBoleto(cobranca)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Reenviar
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => marcarComoPago(cobranca)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Marcar Pago
                          </Button>
                        </>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal Gerar Cobrança */}
        <GerarCobrancaModal
          open={modalGerarCobranca}
          onOpenChange={setModalGerarCobranca}
        />
      </div>
    </div>
  );
};

export default Cobranca;