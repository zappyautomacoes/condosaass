import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  CreditCard,
  Settings,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  RefreshCcw,
  Zap,
  DollarSign,
  Calendar,
  BarChart3,
  FileText,
  Shield
} from "lucide-react";

interface BankConfig {
  id: string;
  banco: string;
  agencia: string;
  conta: string;
  status: "Conectado" | "Desconectado" | "Configurando";
  saldo?: number;
  ultimaSync?: Date;
}

interface Transacao {
  id: string;
  tipo: "Entrada" | "Saída";
  valor: number;
  descricao: string;
  data: Date;
  status: "Processado" | "Pendente" | "Erro";
  condominio: string;
}

const mockBankConfigs: BankConfig[] = [
  {
    id: "1",
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "12345-6",
    status: "Conectado",
    saldo: 125430.50,
    ultimaSync: new Date("2024-01-20 10:30")
  },
  {
    id: "2", 
    banco: "Itaú",
    agencia: "9876-1",
    conta: "98765-4",
    status: "Desconectado",
    ultimaSync: new Date("2024-01-18 16:45")
  }
];

const mockTransacoes: Transacao[] = [
  {
    id: "1",
    tipo: "Entrada",
    valor: 2500.00,
    descricao: "Taxa de condomínio - Residencial Aurora",
    data: new Date("2024-01-20 09:15"),
    status: "Processado",
    condominio: "Residencial Aurora"
  },
  {
    id: "2",
    tipo: "Entrada", 
    valor: 1800.00,
    descricao: "Taxa de condomínio - Edifício Solar",
    data: new Date("2024-01-20 08:30"),
    status: "Processado",
    condominio: "Edifício Solar"
  },
  {
    id: "3",
    tipo: "Saída",
    valor: 750.00,
    descricao: "Manutenção elevador",
    data: new Date("2024-01-19 14:20"),
    status: "Processado",
    condominio: "Edifício Solar"
  }
];

const IntegracaoBancaria = () => {
  const [selectedBank, setSelectedBank] = useState<BankConfig | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [newBankData, setNewBankData] = useState({
    banco: "",
    agencia: "",
    conta: "",
    clientId: "",
    clientSecret: ""
  });

  const handleConfigureBanco = () => {
    setIsConfiguring(true);
    // Aqui seria implementada a lógica de configuração
    setTimeout(() => {
      setIsConfiguring(false);
      console.log("Banco configurado:", newBankData);
    }, 2000);
  };

  const handleSyncBanco = (bankId: string) => {
    console.log("Sincronizando banco:", bankId);
    // Aqui seria implementada a sincronização
  };

  const getStatusColor = (status: BankConfig["status"]) => {
    switch (status) {
      case "Conectado":
        return "bg-success/10 text-success border-success/20";
      case "Desconectado":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Configurando":
        return "bg-warning/10 text-warning border-warning/20";
    }
  };

  const getStatusIcon = (status: BankConfig["status"]) => {
    switch (status) {
      case "Conectado":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Desconectado":
        return <AlertCircle className="w-4 h-4" />;
      case "Configurando":
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Integração Bancária</h1>
              <p className="text-muted-foreground">Configure conexões com bancos e monitore transações</p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsConfiguring(true)}
            className="bg-gradient-primary text-primary-foreground shadow-glow"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Adicionar Banco
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  R$ {mockBankConfigs.reduce((acc, bank) => acc + (bank.saldo || 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">Saldo Total</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockTransacoes.filter(t => t.tipo === "Entrada").length}
                </p>
                <p className="text-sm text-muted-foreground">Recebimentos</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <RefreshCcw className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockTransacoes.filter(t => t.status === "Pendente").length}
                </p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockBankConfigs.filter(b => b.status === "Conectado").length}
                </p>
                <p className="text-sm text-muted-foreground">Bancos Ativos</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bancos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bancos">Bancos</TabsTrigger>
            <TabsTrigger value="transacoes">Transações</TabsTrigger>
            <TabsTrigger value="conciliacao">Conciliação</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Tab Bancos */}
          <TabsContent value="bancos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de Bancos */}
              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Contas Bancárias
                  </h3>
                  
                  <div className="space-y-4">
                    {mockBankConfigs.map((bank) => (
                      <div
                        key={bank.id}
                        className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => setSelectedBank(bank)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground">{bank.banco}</h4>
                          <Badge className={getStatusColor(bank.status)}>
                            {getStatusIcon(bank.status)}
                            <span className="ml-1">{bank.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>Agência: {bank.agencia}</p>
                          <p>Conta: {bank.conta}</p>
                          {bank.saldo && (
                            <p className="text-foreground font-semibold">
                              Saldo: R$ {bank.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          )}
                          {bank.ultimaSync && (
                            <p>Última sync: {bank.ultimaSync.toLocaleString('pt-BR')}</p>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSyncBanco(bank.id);
                            }}
                          >
                            <RefreshCcw className="w-3 h-3 mr-1" />
                            Sincronizar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-3 h-3 mr-1" />
                            Configurar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Formulário de Configuração */}
              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {selectedBank ? `Configurar ${selectedBank.banco}` : "Adicionar Novo Banco"}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="banco">Banco</Label>
                      <Select
                        value={newBankData.banco}
                        onValueChange={(value) => setNewBankData(prev => ({ ...prev, banco: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o banco" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bb">Banco do Brasil</SelectItem>
                          <SelectItem value="itau">Itaú</SelectItem>
                          <SelectItem value="bradesco">Bradesco</SelectItem>
                          <SelectItem value="santander">Santander</SelectItem>
                          <SelectItem value="caixa">Caixa Econômica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="agencia">Agência</Label>
                        <Input
                          id="agencia"
                          value={newBankData.agencia}
                          onChange={(e) => setNewBankData(prev => ({ ...prev, agencia: e.target.value }))}
                          placeholder="1234-5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="conta">Conta</Label>
                        <Input
                          id="conta"
                          value={newBankData.conta}
                          onChange={(e) => setNewBankData(prev => ({ ...prev, conta: e.target.value }))}
                          placeholder="12345-6"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Credenciais de API
                      </h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="clientId">Client ID</Label>
                        <Input
                          id="clientId"
                          type="password"
                          value={newBankData.clientId}
                          onChange={(e) => setNewBankData(prev => ({ ...prev, clientId: e.target.value }))}
                          placeholder="Chave de acesso do banco"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clientSecret">Client Secret</Label>
                        <Input
                          id="clientSecret"
                          type="password"
                          value={newBankData.clientSecret}
                          onChange={(e) => setNewBankData(prev => ({ ...prev, clientSecret: e.target.value }))}
                          placeholder="Chave secreta do banco"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleConfigureBanco}
                      disabled={isConfiguring}
                      className="w-full bg-gradient-primary text-primary-foreground shadow-glow"
                    >
                      {isConfiguring ? (
                        <>
                          <Settings className="w-4 h-4 mr-2 animate-spin" />
                          Configurando...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Configurar Integração
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Transações */}
          <TabsContent value="transacoes" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Transações Recentes
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockTransacoes.map((transacao) => (
                    <div
                      key={transacao.id}
                      className="p-4 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            transacao.tipo === "Entrada" 
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {transacao.tipo === "Entrada" ? "+" : "-"}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {transacao.descricao}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transacao.condominio}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`font-bold ${
                            transacao.tipo === "Entrada" 
                              ? "text-success" 
                              : "text-destructive"
                          }`}>
                            {transacao.tipo === "Entrada" ? "+" : "-"}R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <div className="flex items-center gap-2 justify-end">
                            <Badge variant={
                              transacao.status === "Processado" ? "default" :
                              transacao.status === "Pendente" ? "secondary" : "destructive"
                            } className="text-xs">
                              {transacao.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {transacao.data.toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab Conciliação */}
          <TabsContent value="conciliacao" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Conciliação Automática
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Conciliação Automática</p>
                        <p className="text-sm text-muted-foreground">
                          Reconciliar pagamentos automaticamente
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-muted/30">
                      <div className="text-center">
                        <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">98%</p>
                        <p className="text-sm text-muted-foreground">Taxa de Conciliação</p>
                      </div>
                    </Card>

                    <Card className="p-4 bg-muted/30">
                      <div className="text-center">
                        <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">2h</p>
                        <p className="text-sm text-muted-foreground">Tempo Médio</p>
                      </div>
                    </Card>

                    <Card className="p-4 bg-muted/30">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">15</p>
                        <p className="text-sm text-muted-foreground">Pendências</p>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Configurações de Conciliação</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Tolerância de valor (R$)</Label>
                        <Input className="w-32" defaultValue="5.00" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Tolerância de data (dias)</Label>
                        <Input className="w-32" defaultValue="3" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Notificar divergências</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab Relatórios */}
          <TabsContent value="relatorios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Relatórios Disponíveis
                  </h3>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Extrato Consolidado
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Relatório de Conciliação
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Análise de Fluxo de Caixa
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Relatório de Recebimentos
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Configurações de Relatório
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Período</Label>
                      <Select defaultValue="mensal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diario">Diário</SelectItem>
                          <SelectItem value="semanal">Semanal</SelectItem>
                          <SelectItem value="mensal">Mensal</SelectItem>
                          <SelectItem value="trimestral">Trimestral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Formato</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-gradient-primary text-primary-foreground shadow-glow">
                      <Download className="w-4 h-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegracaoBancaria;