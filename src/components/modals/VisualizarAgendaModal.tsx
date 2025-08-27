import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, MapPin, User, Filter } from "lucide-react";
import { format, isToday, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface VisualizarAgendaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservas: any[];
}

export const VisualizarAgendaModal = ({ open, onOpenChange, reservas }: VisualizarAgendaModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filtroEspaco, setFiltroEspaco] = useState<string>("todos");

  const espacos = [
    "Salão de Festas",
    "Churrasqueira", 
    "Quadra Esportiva",
    "Piscina",
    "Sala de Jogos",
    "Academia"
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-success/10 text-success border-success/20 text-xs">Confirmada</Badge>;
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">Pendente</Badge>;
      case "cancelada":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">Cancelada</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  // Filtrar reservas por data selecionada e espaço
  const reservasFiltradas = reservas.filter(reserva => {
    const reservaDate = new Date(reserva.data + 'T00:00:00');
    const sameDay = isSameDay(reservaDate, selectedDate);
    const matchEspaco = filtroEspaco === "todos" || reserva.espaco === filtroEspaco;
    return sameDay && matchEspaco;
  });

  // Agrupar reservas por horário
  const reservasAgrupadas = reservasFiltradas.sort((a, b) => {
    const horaA = a.horario?.split('-')[0] || "00:00";
    const horaB = b.horario?.split('-')[0] || "00:00";
    return horaA.localeCompare(horaB);
  });

  // Verificar se há reservas para uma data
  const hasReservasOnDate = (date: Date) => {
    return reservas.some(reserva => {
      const reservaDate = new Date(reserva.data + 'T00:00:00');
      return isSameDay(reservaDate, date);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Agenda de Reservas
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh]">
          {/* Calendário */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Selecione uma data</h4>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasReservas: (date) => hasReservasOnDate(date),
                }}
                modifiersStyles={{
                  hasReservas: { 
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))',
                    fontWeight: 'bold'
                  }
                }}
                locale={ptBR}
              />
            </div>
            
            {/* Filtro por Espaço */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtrar por Espaço
              </label>
              <Select value={filtroEspaco} onValueChange={setFiltroEspaco}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os espaços" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os espaços</SelectItem>
                  {espacos.map((espaco) => (
                    <SelectItem key={espaco} value={espaco}>
                      {espaco}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Reservas */}
          <div className="space-y-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">
                Reservas de {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                {isToday(selectedDate) && <span className="text-primary ml-2">(Hoje)</span>}
              </h4>
              <Badge variant="outline" className="text-xs">
                {reservasFiltradas.length} reserva(s)
              </Badge>
            </div>
            
            <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2">
              {reservasAgrupadas.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Nenhuma reserva encontrada para esta data</p>
                  {filtroEspaco !== "todos" && (
                    <p className="text-sm mt-1">Filtrando por: {filtroEspaco}</p>
                  )}
                </div>
              ) : (
                reservasAgrupadas.map((reserva) => (
                  <Card key={reserva.id} className="p-4 bg-gradient-card border-0 shadow-soft">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground">
                            {reserva.horario}
                          </span>
                        </div>
                        {getStatusBadge(reserva.status)}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">
                            {reserva.espaco}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{reserva.morador}</span>
                          {reserva.apartamento && (
                            <Badge variant="outline" className="text-xs">
                              {reserva.apartamento}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {reserva.observacoes && (
                        <div className="text-xs text-muted-foreground bg-muted/30 rounded p-2">
                          {reserva.observacoes}
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};