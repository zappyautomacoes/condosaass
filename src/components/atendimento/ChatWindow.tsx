import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Building2,
  User,
  Pin,
  PinOff,
  Archive,
  CheckCircle2,
  Clock,
  AlertCircle,
  Tag,
  UserPlus
} from "lucide-react";
import { Conversa } from "./ConversasList";

interface Mensagem {
  id: string;
  tipo: "enviada" | "recebida";
  conteudo: string;
  timestamp: Date;
  status?: "enviando" | "enviada" | "lida";
  anexos?: string[];
}

interface ChatWindowProps {
  conversa: Conversa | null;
  mensagens: Mensagem[];
  onEnviarMensagem: (conteudo: string) => void;
  onAlterarStatus: (status: Conversa["status"]) => void;
  onFixarConversa: (fixar: boolean) => void;
  onArquivarConversa: () => void;
  onAtribuirUsuario: () => void;
}

export const ChatWindow = ({ 
  conversa, 
  mensagens, 
  onEnviarMensagem,
  onAlterarStatus,
  onFixarConversa,
  onArquivarConversa,
  onAtribuirUsuario
}: ChatWindowProps) => {
  const [novaMensagem, setNovaMensagem] = useState("");

  if (!conversa) {
    return (
      <Card className="h-full bg-gradient-card border-0 shadow-soft flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Selecione uma conversa
          </h3>
          <p className="text-muted-foreground">
            Escolha uma conversa da lista para iniciar o atendimento
          </p>
        </div>
      </Card>
    );
  }

  const handleEnviarMensagem = () => {
    if (!novaMensagem.trim()) return;
    onEnviarMensagem(novaMensagem);
    setNovaMensagem("");
  };

  const getTipoIcon = (tipo: Conversa["tipo"]) => {
    switch (tipo) {
      case "whatsapp":
        return <Phone className="w-5 h-5 text-success" />;
      case "sistema":
        return <Building2 className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusIcon = (status: Conversa["status"]) => {
    switch (status) {
      case "Novo":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "Em andamento":
        return <Clock className="w-4 h-4 text-accent" />;
      case "Resolvido":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
    }
  };

  const getStatusBadge = (status: Conversa["status"]) => {
    const variants = {
      "Novo": "bg-warning/10 text-warning border-warning/20",
      "Em andamento": "bg-accent/10 text-accent border-accent/20", 
      "Resolvido": "bg-success/10 text-success border-success/20"
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <Card className="h-full bg-gradient-card border-0 shadow-soft flex flex-col">
      {/* Header da Conversa */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getTipoIcon(conversa.tipo)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {conversa.nome}
                </h3>
                {conversa.fixada && <Pin className="w-4 h-4 text-primary" />}
                {conversa.urgente && (
                  <Badge variant="destructive" className="text-xs px-1">
                    Urgente
                  </Badge>
                )}
              </div>
              {conversa.telefone && conversa.tipo === "whatsapp" && (
                <p className="text-sm text-muted-foreground">
                  {conversa.telefone}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {conversa.categoria}
                </Badge>
                {getStatusBadge(conversa.status)}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onFixarConversa(!conversa.fixada)}>
                {conversa.fixada ? <PinOff className="w-4 h-4 mr-2" /> : <Pin className="w-4 h-4 mr-2" />}
                {conversa.fixada ? "Desafixar" : "Fixar conversa"}
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onAtribuirUsuario}>
                <UserPlus className="w-4 h-4 mr-2" />
                Atribuir usuário
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Tag className="w-4 h-4 mr-2" />
                Adicionar tags
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => onAlterarStatus("Novo")}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Marcar como novo
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => onAlterarStatus("Em andamento")}>
                <Clock className="w-4 h-4 mr-2" />
                Em andamento
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => onAlterarStatus("Resolvido")}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Marcar como resolvido
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={onArquivarConversa} className="text-destructive">
                <Archive className="w-4 h-4 mr-2" />
                Arquivar conversa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {mensagens.map((mensagem) => (
          <div
            key={mensagem.id}
            className={`flex ${mensagem.tipo === "enviada" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                mensagem.tipo === "enviada"
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-muted/30 text-foreground"
              }`}
            >
              <p className="text-sm">{mensagem.conteudo}</p>
              
              {mensagem.anexos && mensagem.anexos.length > 0 && (
                <div className="mt-2 space-y-1">
                  {mensagem.anexos.map((anexo, index) => (
                    <div key={index} className="text-xs opacity-80">
                      📎 {anexo}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-1">
                <p className={`text-xs ${
                  mensagem.tipo === "enviada" 
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}>
                  {mensagem.timestamp.toLocaleString('pt-BR')}
                </p>
                
                {mensagem.tipo === "enviada" && mensagem.status && (
                  <div className="text-xs text-primary-foreground/70">
                    {mensagem.status === "enviando" && "⏳"}
                    {mensagem.status === "enviada" && "✓"}
                    {mensagem.status === "lida" && "✓✓"}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input de Resposta */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-3">
          <Textarea
            placeholder={`Responder para ${conversa.nome}...`}
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            className="flex-1 min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleEnviarMensagem();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-10 w-10 p-0"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleEnviarMensagem}
              disabled={!novaMensagem.trim()}
              className="h-10 w-10 p-0 bg-gradient-primary text-primary-foreground shadow-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <span>Enter para enviar, Shift+Enter para quebra de linha</span>
        </div>
      </div>
    </Card>
  );
};