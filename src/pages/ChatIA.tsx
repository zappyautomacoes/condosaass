import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send,
  Bot,
  User,
  Clock,
  Calendar,
  Wrench,
  CreditCard,
  Users,
  FileText,
  Phone,
  AlertCircle
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { icon: Calendar, label: "Reservar Espaço", query: "Como faço para reservar um espaço?" },
  { icon: Wrench, label: "Manutenção", query: "Preciso solicitar uma manutenção" },
  { icon: CreditCard, label: "Boletos", query: "Como consulto meus boletos?" },
  { icon: FileText, label: "Regulamento", query: "Onde encontro o regulamento?" },
  { icon: Phone, label: "Contato", query: "Preciso de um número de telefone" },
  { icon: Users, label: "Assembleia", query: "Quando será a próxima assembleia?" }
];

const getAutoResponse = (message: string): { text: string; suggestions?: string[] } => {
  const msg = message.toLowerCase();
  
  if (msg.includes("reserva") || msg.includes("agendar") || msg.includes("espaço")) {
    return {
      text: "🏢 Para reservar um espaço, você pode:\n\n• Acessar o menu 'Reservas' no sistema\n• Escolher o espaço desejado (Salão de Festas, Churrasqueira, etc.)\n• Selecionar data e horário disponível\n• Confirmar a reserva\n\nOs espaços disponíveis são: Salão de Festas, Churrasqueira, Quadra Esportiva e Piscina.",
      suggestions: ["Ver espaços disponíveis", "Consultar minhas reservas", "Cancelar reserva"]
    };
  }
  
  if (msg.includes("manutenção") || msg.includes("reparo") || msg.includes("problema")) {
    return {
      text: "🔧 Para solicitar manutenção:\n\n• Acesse o menu 'Manutenções'\n• Clique em 'Nova Solicitação'\n• Descreva o problema detalhadamente\n• Informe a localização (apartamento/área comum)\n• Anexe fotos se necessário\n\nSua solicitação será analisada e você receberá um protocolo para acompanhamento.",
      suggestions: ["Acompanhar solicitação", "Manutenções de emergência", "Histórico de manutenções"]
    };
  }
  
  if (msg.includes("boleto") || msg.includes("pagamento") || msg.includes("taxa")) {
    return {
      text: "💳 Sobre boletos e pagamentos:\n\n• Acesse o menu 'Financeiro' para consultar\n• Boletos são gerados todo dia 1º do mês\n• Vencimento: dia 15 de cada mês\n• Aceita PIX, cartão ou transferência\n• Em caso de atraso, entre em contato\n\nTaxa de condomínio atual: R$ 850,00",
      suggestions: ["Consultar boletos em aberto", "Histórico de pagamentos", "Segunda via de boleto"]
    };
  }
  
  if (msg.includes("regulamento") || msg.includes("regra") || msg.includes("norma")) {
    return {
      text: "📋 Regulamento do Condomínio:\n\n• Silêncio após 22h\n• Uso de áreas comuns até 23h\n• Animais permitidos (com registro)\n• Visitantes devem se identificar\n• Reformas: autorização prévia\n\nO regulamento completo está disponível no menu 'Documentos' ou na portaria.",
      suggestions: ["Ver regulamento completo", "Normas para animais", "Regras de reforma"]
    };
  }
  
  if (msg.includes("assembleia") || msg.includes("reunião") || msg.includes("votação")) {
    return {
      text: "🏛️ Próxima Assembleia:\n\n📅 Data: 25/01/2024 às 19h\n📍 Local: Salão de Festas\n\n📋 Pauta prevista:\n• Prestação de contas 2023\n• Orçamento 2024\n• Propostas de melhorias\n• Eleição do síndico\n\nTodos os moradores têm direito a voto.",
      suggestions: ["Ver pauta completa", "Como participar", "Procuração para assembleia"]
    };
  }
  
  if (msg.includes("contato") || msg.includes("telefone") || msg.includes("emergência")) {
    return {
      text: "📞 Contatos Importantes:\n\n🏢 Administração: (11) 9999-0000\n🚨 Emergência: (11) 9999-1111\n🔧 Manutenção: (11) 9999-2222\n🏊 Portaria: (11) 9999-3333\n\n⏰ Horário de atendimento:\nSeg-Sex: 8h às 18h\nSáb: 8h às 12h",
      suggestions: ["Números de emergência", "Horários da portaria", "Email da administração"]
    };
  }
  
  if (msg.includes("olá") || msg.includes("oi") || msg.includes("bom dia") || msg.includes("boa tarde") || msg.includes("boa noite")) {
    return {
      text: "👋 Olá! Sou a assistente virtual do Administre!\n\nEstou aqui para ajudar com informações sobre:\n• Reservas de espaços\n• Solicitações de manutenção\n• Consulta de boletos\n• Regulamento do condomínio\n• Assembleias e reuniões\n• Contatos importantes\n\nEm que posso ajudar você hoje?",
      suggestions: ["Reservar espaço", "Solicitar manutenção", "Consultar boletos"]
    };
  }
  
  return {
    text: "🤖 Desculpe, não entendi sua pergunta. Posso ajudar com:\n\n• Reservas de espaços comuns\n• Solicitações de manutenção\n• Consulta de boletos e pagamentos\n• Regulamento interno\n• Informações sobre assembleias\n• Contatos importantes\n\nTente reformular sua pergunta ou use uma das sugestões abaixo.",
    suggestions: ["Como reservar um espaço?", "Preciso solicitar manutenção", "Consultar meus boletos"]
  };
};

const ChatIA = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Olá! Sou a assistente virtual do Administre. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Reservar espaço", "Solicitar manutenção", "Consultar boletos"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAutoResponse(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-4xl mx-auto h-[calc(100vh-3rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Chat IA</h1>
              <p className="text-muted-foreground">Assistente virtual do condomínio</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-success/10 text-success border-success/20">
              <div className="w-2 h-2 bg-success rounded-full mr-2" />
              Online
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Resposta em segundos
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-4 mb-6 bg-gradient-card border-0 shadow-soft">
          <h3 className="font-semibold text-foreground mb-3">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-3 flex flex-col gap-2 hover:bg-muted/50"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Messages */}
        <Card className="flex-1 flex flex-col bg-gradient-card border-0 shadow-soft overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={
                    message.sender === "bot" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-accent/10 text-accent"
                  }>
                    {message.sender === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-3 rounded-lg whitespace-pre-line ${
                      message.sender === "user"
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-muted/30 text-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleSuggestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(inputMessage);
                  }
                }}
                disabled={isTyping}
              />
              <Button
                onClick={() => sendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-primary text-primary-foreground shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3" />
              <span>Para emergências, ligue: (11) 9999-1111</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatIA;