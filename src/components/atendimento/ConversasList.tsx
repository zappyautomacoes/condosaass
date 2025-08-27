import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Building2,
  MessageSquare,
  CreditCard,
  Wrench,
  Calendar,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pin
} from "lucide-react";

export interface Conversa {
  id: string;
  nome: string;
  tipo: "whatsapp" | "sistema";
  categoria: "Financeiro" | "Manutenção" | "Reservas" | "Outros";
  status: "Novo" | "Em andamento" | "Resolvido";
  ultimaMensagem: string;
  timestamp: Date;
  naoLidas: number;
  urgente: boolean;
  fixada: boolean;
  avatar?: string;
  telefone?: string;
}

interface ConversasListProps {
  conversas: Conversa[];
  selectedConversaId?: string;
  onSelectConversa: (conversa: Conversa) => void;
}

export const ConversasList = ({ conversas, selectedConversaId, onSelectConversa }: ConversasListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTipo, setFilterTipo] = useState<string>("all");

  const getCategoriaIcon = (categoria: Conversa["categoria"]) => {
    switch (categoria) {
      case "Financeiro":
        return <CreditCard className="w-4 h-4 text-primary" />;
      case "Manutenção":
        return <Wrench className="w-4 h-4 text-warning" />;
      case "Reservas":
        return <Calendar className="w-4 h-4 text-accent" />;
      case "Outros":
        return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
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

  const getTipoIcon = (tipo: Conversa["tipo"]) => {
    switch (tipo) {
      case "whatsapp":
        return <Phone className="w-4 h-4 text-success" />;
      case "sistema":
        return <Building2 className="w-4 h-4 text-primary" />;
    }
  };

  const filteredConversas = conversas.filter(conversa => {
    const matchesSearch = conversa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversa.ultimaMensagem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filterCategoria === "all" || conversa.categoria === filterCategoria;
    const matchesStatus = filterStatus === "all" || conversa.status === filterStatus;
    const matchesTipo = filterTipo === "all" || conversa.tipo === filterTipo;
    
    return matchesSearch && matchesCategoria && matchesStatus && matchesTipo;
  });

  // Ordenar: fixadas primeiro, depois por timestamp
  const sortedConversas = filteredConversas.sort((a, b) => {
    if (a.fixada && !b.fixada) return -1;
    if (!a.fixada && b.fixada) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <Card className="h-full bg-gradient-card border-0 shadow-soft flex flex-col">
      {/* Header e Filtros */}
      <div className="p-4 border-b border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Conversas</h2>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {conversas.filter(c => c.naoLidas > 0).length} não lidas
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Origem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="sistema">Sistema</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Novo">Novo</SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Resolvido">Resolvido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={filterCategoria} onValueChange={setFilterCategoria}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="Financeiro">Financeiro</SelectItem>
            <SelectItem value="Manutenção">Manutenção</SelectItem>
            <SelectItem value="Reservas">Reservas</SelectItem>
            <SelectItem value="Outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Conversas */}
      <div className="flex-1 overflow-y-auto">
        {sortedConversas.map((conversa) => (
          <div
            key={conversa.id}
            className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors relative ${
              selectedConversaId === conversa.id ? "bg-muted/50" : ""
            }`}
            onClick={() => onSelectConversa(conversa)}
          >
            {conversa.fixada && (
              <Pin className="absolute top-2 right-2 w-3 h-3 text-primary" />
            )}
            
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getTipoIcon(conversa.tipo)}
                  </AvatarFallback>
                </Avatar>
                {conversa.naoLidas > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-xs text-destructive-foreground font-bold">
                      {conversa.naoLidas > 9 ? "9+" : conversa.naoLidas}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm text-foreground truncate">
                    {conversa.nome}
                  </h4>
                  {conversa.urgente && (
                    <Badge variant="destructive" className="text-xs px-1">
                      Urgente
                    </Badge>
                  )}
                </div>
                
                {conversa.telefone && conversa.tipo === "whatsapp" && (
                  <p className="text-xs text-muted-foreground mb-1">
                    {conversa.telefone}
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {conversa.ultimaMensagem}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoriaIcon(conversa.categoria)}
                    <Badge variant="outline" className="text-xs">
                      {conversa.categoria}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(conversa.status)}
                    <span className="text-xs text-muted-foreground">
                      {conversa.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedConversas.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma conversa encontrada
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategoria !== "all" || filterStatus !== "all" || filterTipo !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Aguardando novas mensagens..."
              }
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};