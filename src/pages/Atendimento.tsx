import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone
} from "lucide-react";
import { ConversasList, type Conversa } from "@/components/atendimento/ConversasList";
import { ChatWindow } from "@/components/atendimento/ChatWindow";

interface Mensagem {
  id: string;
  tipo: "enviada" | "recebida";
  conteudo: string;
  timestamp: Date;
  status?: "enviando" | "enviada" | "lida";
  anexos?: string[];
}

const mockConversas: Conversa[] = [
  {
    id: "1",
    nome: "Maria Silva - Residencial Aurora",
    tipo: "whatsapp",
    categoria: "Financeiro",
    status: "Novo",
    ultimaMensagem: "Olá, gostaria de entender por que houve aumento na taxa este mês.",
    timestamp: new Date("2024-01-20 09:30"),
    naoLidas: 2,
    urgente: true,
    fixada: false,
    telefone: "+55 11 99999-9999"
  },
  {
    id: "2",
    nome: "João Santos - Edifício Solar", 
    tipo: "whatsapp",
    categoria: "Manutenção",
    status: "Em andamento",
    ultimaMensagem: "O elevador social está fazendo ruído estranho há 3 dias.",
    timestamp: new Date("2024-01-19 14:15"),
    naoLidas: 0,
    urgente: false,
    fixada: true,
    telefone: "+55 11 88888-8888"
  },
  {
    id: "3",
    nome: "Ana Costa - Condomínio Verde",
    tipo: "sistema",
    categoria: "Reservas", 
    status: "Resolvido",
    ultimaMensagem: "Preciso cancelar a reserva do salão de festas para sábado.",
    timestamp: new Date("2024-01-18 16:45"),
    naoLidas: 0,
    urgente: false,
    fixada: false
  },
  {
    id: "4",
    nome: "Carlos Oliveira - Residencial Aurora",
    tipo: "whatsapp",
    categoria: "Outros",
    status: "Novo", 
    ultimaMensagem: "Boa tarde! Gostaria de saber sobre o novo regulamento da piscina.",
    timestamp: new Date("2024-01-20 15:22"),
    naoLidas: 1,
    urgente: false,
    fixada: false,
    telefone: "+55 11 77777-7777"
  }
];

const mockMensagens: Record<string, Mensagem[]> = {
  "1": [
    {
      id: "m1",
      tipo: "recebida",
      conteudo: "Olá, gostaria de entender por que houve aumento na taxa este mês.",
      timestamp: new Date("2024-01-20 09:30")
    },
    {
      id: "m2",
      tipo: "recebida", 
      conteudo: "Podem me explicar quais foram os custos adicionais?",
      timestamp: new Date("2024-01-20 09:32")
    }
  ],
  "2": [
    {
      id: "m3",
      tipo: "recebida",
      conteudo: "O elevador social está fazendo ruído estranho há 3 dias.",
      timestamp: new Date("2024-01-19 14:15")
    },
    {
      id: "m4",
      tipo: "enviada",
      conteudo: "Olá João! Já acionamos a equipe técnica para verificar o elevador. Previsão de reparo até amanhã.",
      timestamp: new Date("2024-01-19 14:30"),
      status: "lida"
    }
  ],
  "3": [
    {
      id: "m5",
      tipo: "recebida",
      conteudo: "Preciso cancelar a reserva do salão de festas para sábado.",
      timestamp: new Date("2024-01-18 16:45")
    },
    {
      id: "m6", 
      tipo: "enviada",
      conteudo: "Cancelamento realizado com sucesso! O valor será estornado em até 2 dias úteis.",
      timestamp: new Date("2024-01-18 16:50"),
      status: "lida"
    }
  ],
  "4": [
    {
      id: "m7",
      tipo: "recebida",
      conteudo: "Boa tarde! Gostaria de saber sobre o novo regulamento da piscina.",
      timestamp: new Date("2024-01-20 15:22")
    }
  ]
};

const Atendimento = () => {
  const [conversas, setConversas] = useState<Conversa[]>(mockConversas);
  const [selectedConversa, setSelectedConversa] = useState<Conversa | null>(null);
  const [activeTab, setActiveTab] = useState("todos");

  const getFilteredConversas = () => {
    switch (activeTab) {
      case "whatsapp":
        return conversas.filter(c => c.tipo === "whatsapp");
      case "sistema":
        return conversas.filter(c => c.tipo === "sistema");
      case "nao-lidas":
        return conversas.filter(c => c.naoLidas > 0);
      default:
        return conversas;
    }
  };

  const handleEnviarMensagem = (conteudo: string) => {
    if (!selectedConversa) return;
    
    const novaMensagem: Mensagem = {
      id: Date.now().toString(),
      tipo: "enviada",
      conteudo,
      timestamp: new Date(),
      status: "enviando"
    };
    
    // Simular envio
    mockMensagens[selectedConversa.id] = [
      ...(mockMensagens[selectedConversa.id] || []),
      novaMensagem
    ];
    
    // Atualizar status da conversa
    setConversas(prev => prev.map(c => 
      c.id === selectedConversa.id 
        ? { ...c, status: "Em andamento", ultimaMensagem: conteudo }
        : c
    ));
    
    setTimeout(() => {
      novaMensagem.status = "enviada";
    }, 1000);
  };

  const handleAlterarStatus = (status: Conversa["status"]) => {
    if (!selectedConversa) return;
    
    setConversas(prev => prev.map(c =>
      c.id === selectedConversa.id ? { ...c, status } : c
    ));
    setSelectedConversa({ ...selectedConversa, status });
  };

  const handleFixarConversa = (fixar: boolean) => {
    if (!selectedConversa) return;
    
    setConversas(prev => prev.map(c =>
      c.id === selectedConversa.id ? { ...c, fixada: fixar } : c
    ));
    setSelectedConversa({ ...selectedConversa, fixada: fixar });
  };

  const handleArquivarConversa = () => {
    if (!selectedConversa) return;
    
    setConversas(prev => prev.filter(c => c.id !== selectedConversa.id));
    setSelectedConversa(null);
  };

  const handleAtribuirUsuario = () => {
    // Implementar modal de atribuição de usuário
    console.log("Atribuir usuário");
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Atendimento</h1>
              <p className="text-muted-foreground">Central de mensagens dos condomínios</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-warning/10 text-warning border-warning/20">
              <Bell className="w-3 h-3 mr-1" />
              {conversas.filter(c => c.naoLidas > 0).length} não lidas
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {conversas.filter(c => c.status === "Novo").length}
                </p>
                <p className="text-sm text-muted-foreground">Novos</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {conversas.filter(c => c.status === "Em andamento").length}
                </p>
                <p className="text-sm text-muted-foreground">Em andamento</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {conversas.filter(c => c.status === "Resolvido").length}
                </p>
                <p className="text-sm text-muted-foreground">Resolvidos</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {conversas.filter(c => c.tipo === "whatsapp").length}
                </p>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {conversas.filter(c => c.naoLidas > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Não lidas</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs e Conteúdo */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="todos">Todas</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="sistema">Sistema</TabsTrigger>
              <TabsTrigger value="nao-lidas">Não lidas</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-24rem)]">
                {/* Lista de Conversas */}
                <div className="lg:col-span-1">
                  <ConversasList
                    conversas={getFilteredConversas()}
                    selectedConversaId={selectedConversa?.id}
                    onSelectConversa={(conversa) => {
                      setSelectedConversa(conversa);
                      // Marcar como lida
                      if (conversa.naoLidas > 0) {
                        setConversas(prev => prev.map(c =>
                          c.id === conversa.id ? { ...c, naoLidas: 0 } : c
                        ));
                      }
                    }}
                  />
                </div>

                {/* Chat Window */}
                <div className="lg:col-span-2">
                  <ChatWindow
                    conversa={selectedConversa}
                    mensagens={selectedConversa ? mockMensagens[selectedConversa.id] || [] : []}
                    onEnviarMensagem={handleEnviarMensagem}
                    onAlterarStatus={handleAlterarStatus}
                    onFixarConversa={handleFixarConversa}
                    onArquivarConversa={handleArquivarConversa}
                    onAtribuirUsuario={handleAtribuirUsuario}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Atendimento;