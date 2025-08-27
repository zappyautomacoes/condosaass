import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  Clock,
  Mail,
  MessageSquare,
  CreditCard,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Settings,
  Play,
  Pause,
  BarChart3,
  Send,
  Bot,
  Smartphone
} from "lucide-react";

interface Automacao {
  id: string;
  nome: string;
  tipo: "Financeiro" | "Comunicação" | "Manutenção" | "Relatórios";
  status: "Ativo" | "Inativo" | "Configurando";
  descricao: string;
  frequencia: string;
  ultimaExecucao?: Date;
  proximaExecucao?: Date;
  configuracoes: {
    [key: string]: any;
  };
}

const mockAutomacoes: Automacao[] = [
  {
    id: "1",
    nome: "Envio Automático de Boletos",
    tipo: "Financeiro",
    status: "Ativo",
    descricao: "Envio automático de boletos mensais para todos os moradores",
    frequencia: "Mensal",
    ultimaExecucao: new Date("2024-01-01 08:00"),
    proximaExecucao: new Date("2024-02-01 08:00"),
    configuracoes: {
      diaEnvio: 1,
      horario: "08:00",
      template: "template_boleto_padrao"
    }
  },
  {
    id: "2",
    nome: "Lembrete de Vencimento",
    tipo: "Comunicação",
    status: "Ativo",
    descricao: "Lembretes automáticos 3 dias antes do vencimento",
    frequencia: "Diário",
    ultimaExecucao: new Date("2024-01-20 09:00"),
    proximaExecucao: new Date("2024-01-21 09:00"),
    configuracoes: {
      diasAntecedencia: 3,
      canais: ["email", "whatsapp"],
      template: "template_lembrete"
    }
  },
  {
    id: "3",
    nome: "Relatório Financeiro Mensal",
    tipo: "Relatórios",
    status: "Inativo",
    descricao: "Geração e envio de relatórios financeiros mensais",
    frequencia: "Mensal",
    configuracoes: {
      destinatarios: ["sindico@condominio.com"],
      formato: "PDF",
      diaEnvio: 5
    }
  }
];

const Automacao = () => {
  const [automacoes, setAutomacoes] = useState<Automacao[]>(mockAutomacoes);
  const [novaAutomacao, setNovaAutomacao] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    frequencia: "",
    configuracoes: {}
  });

  const handleToggleAutomacao = (id: string) => {
    setAutomacoes(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === "Ativo" ? "Inativo" : "Ativo" }
        : auto
    ));
  };

  const getStatusIcon = (status: Automacao["status"]) => {
    switch (status) {
      case "Ativo":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "Inativo":
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
      case "Configurando":
        return <Settings className="w-4 h-4 text-warning animate-spin" />;
    }
  };

  const getTipoIcon = (tipo: Automacao["tipo"]) => {
    switch (tipo) {
      case "Financeiro":
        return <CreditCard className="w-4 h-4 text-primary" />;
      case "Comunicação":
        return <MessageSquare className="w-4 h-4 text-accent" />;
      case "Manutenção":
        return <Settings className="w-4 h-4 text-warning" />;
      case "Relatórios":
        return <FileText className="w-4 h-4 text-success" />;
    }
  };

  const getStatusColor = (status: Automacao["status"]) => {
    switch (status) {
      case "Ativo":
        return "bg-success/10 text-success border-success/20";
      case "Inativo":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      case "Configurando":
        return "bg-warning/10 text-warning border-warning/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Automação</h1>
              <p className="text-muted-foreground">Configure processos automáticos para otimizar a gestão</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-success/10 text-success border-success/20">
              {automacoes.filter(a => a.status === "Ativo").length} ativas
            </Badge>
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow">
              <Zap className="w-4 h-4 mr-2" />
              Nova Automação
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {automacoes.filter(a => a.status === "Ativo").length}
                </p>
                <p className="text-sm text-muted-foreground">Ativas</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted/10 rounded-lg flex items-center justify-center">
                <Pause className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {automacoes.filter(a => a.status === "Inativo").length}
                </p>
                <p className="text-sm text-muted-foreground">Inativas</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24h</p>
                <p className="text-sm text-muted-foreground">Economia/dia</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Taxa Sucesso</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="automacoes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="automacoes">Automações</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          {/* Tab Automações */}
          <TabsContent value="automacoes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {automacoes.map((automacao) => (
                <Card key={automacao.id} className="bg-gradient-card border-0 shadow-soft">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getTipoIcon(automacao.tipo)}
                        <div>
                          <h3 className="font-semibold text-foreground">{automacao.nome}</h3>
                          <p className="text-sm text-muted-foreground">{automacao.descricao}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(automacao.status)}>
                          {getStatusIcon(automacao.status)}
                          <span className="ml-1">{automacao.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frequência:</span>
                        <span className="text-foreground">{automacao.frequencia}</span>
                      </div>
                      
                      {automacao.ultimaExecucao && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Última execução:</span>
                          <span className="text-foreground">
                            {automacao.ultimaExecucao.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                      
                      {automacao.proximaExecucao && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Próxima execução:</span>
                          <span className="text-foreground">
                            {automacao.proximaExecucao.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Switch
                        checked={automacao.status === "Ativo"}
                        onCheckedChange={() => handleToggleAutomacao(automacao.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3 mr-1" />
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Histórico
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">E-mail de Cobrança</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Template padrão para envio de cobranças por e-mail
                  </p>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar Template
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="w-8 h-8 text-success" />
                    <h3 className="text-lg font-semibold text-foreground">WhatsApp Lembrete</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Mensagem automática de lembrete via WhatsApp
                  </p>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar Template
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Relatório Financeiro</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Layout padrão para relatórios financeiros
                  </p>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar Template
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Logs */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Histórico de Execuções
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-semibold text-foreground">Envio Automático de Boletos</p>
                        <p className="text-sm text-muted-foreground">Executado com sucesso</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">01/01/2024 08:00</p>
                      <p className="text-xs text-muted-foreground">45 boletos enviados</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-semibold text-foreground">Lembrete de Vencimento</p>
                        <p className="text-sm text-muted-foreground">Executado com sucesso</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">20/01/2024 09:00</p>
                      <p className="text-xs text-muted-foreground">12 lembretes enviados</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-semibold text-foreground">Relatório Financeiro Mensal</p>
                        <p className="text-sm text-muted-foreground">Falha na execução</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">05/01/2024 10:00</p>
                      <p className="text-xs text-muted-foreground">Erro de configuração</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab Configurações */}
          <TabsContent value="configuracoes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Configurações Gerais
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Execução automática</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Notificações de erro</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Logs detalhados</Label>
                      <Switch />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>E-mail para notificações</Label>
                      <Input defaultValue="admin@condominio.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fuso horário</Label>
                      <Select defaultValue="america/sao_paulo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america/sao_paulo">América/São Paulo</SelectItem>
                          <SelectItem value="america/rio_branco">América/Rio Branco</SelectItem>
                          <SelectItem value="america/manaus">América/Manaus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Integrações Externas
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">E-mail SMTP</p>
                          <p className="text-sm text-muted-foreground">Configurar servidor de e-mail</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-semibold text-foreground">WhatsApp API</p>
                          <p className="text-sm text-muted-foreground">Integração com WhatsApp Business</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-semibold text-foreground">Gateway de Pagamento</p>
                          <p className="text-sm text-muted-foreground">Integração bancária</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
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

export default Automacao;