import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface EditarReservaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reserva: any;
  onReservaUpdated?: (reserva: any) => void;
}

export const EditarReservaModal = ({ open, onOpenChange, reserva, onReservaUpdated }: EditarReservaModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    morador: "",
    apartamento: "",
    espaco: "",
    data: undefined as Date | undefined,
    horarioInicio: "",
    horarioFim: "",
    observacoes: "",
    status: "",
  });

  const espacos = [
    "Salão de Festas",
    "Churrasqueira", 
    "Quadra Esportiva",
    "Piscina",
    "Sala de Jogos",
    "Academia"
  ];

  const horarios = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00"
  ];

  const statusOptions = [
    { value: "pendente", label: "Pendente" },
    { value: "confirmada", label: "Confirmada" },
    { value: "cancelada", label: "Cancelada" }
  ];

  useEffect(() => {
    if (reserva && open) {
      const [inicio, fim] = reserva.horario ? reserva.horario.split('-') : ['', ''];
      setFormData({
        morador: reserva.morador || "",
        apartamento: reserva.apartamento || "",
        espaco: reserva.espaco || "",
        data: reserva.data ? parse(reserva.data, "yyyy-MM-dd", new Date()) : undefined,
        horarioInicio: inicio || "",
        horarioFim: fim || "",
        observacoes: reserva.observacoes || "",
        status: reserva.status || "pendente",
      });
    }
  }, [reserva, open]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.morador || !formData.espaco || !formData.data || !formData.horarioInicio) {
      toast({
        title: "Erro no preenchimento",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const reservaAtualizada = {
      ...reserva,
      morador: formData.morador,
      apartamento: formData.apartamento,
      espaco: formData.espaco,
      data: format(formData.data, "yyyy-MM-dd"),
      horario: `${formData.horarioInicio}-${formData.horarioFim}`,
      observacoes: formData.observacoes,
      status: formData.status,
    };

    onReservaUpdated?.(reservaAtualizada);
    
    toast({
      title: "Reserva atualizada!",
      description: `Reserva ${reserva.protocolo} foi atualizada com sucesso.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Reserva - {reserva?.protocolo}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="morador">Morador *</Label>
              <Input
                id="morador"
                value={formData.morador}
                onChange={(e) => handleInputChange("morador", e.target.value)}
                placeholder="Nome do morador"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apartamento">Apartamento</Label>
              <Input
                id="apartamento"
                value={formData.apartamento}
                onChange={(e) => handleInputChange("apartamento", e.target.value)}
                placeholder="Ex: Apt 301"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="espaco">Espaço *</Label>
            <Select value={formData.espaco} onValueChange={(value) => handleInputChange("espaco", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o espaço" />
              </SelectTrigger>
              <SelectContent>
                {espacos.map((espaco) => (
                  <SelectItem key={espaco} value={espaco}>
                    {espaco}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data da Reserva *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.data && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.data ? format(formData.data, "dd/MM/yyyy") : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.data}
                  onSelect={(date) => handleInputChange("data", date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horarioInicio">Início *</Label>
              <Select value={formData.horarioInicio} onValueChange={(value) => handleInputChange("horarioInicio", value)}>
                <SelectTrigger>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Hora início" />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((horario) => (
                    <SelectItem key={horario} value={horario}>
                      {horario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="horarioFim">Fim</Label>
              <Select value={formData.horarioFim} onValueChange={(value) => handleInputChange("horarioFim", value)}>
                <SelectTrigger>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Hora fim" />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((horario) => (
                    <SelectItem key={horario} value={horario}>
                      {horario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Informações adicionais sobre a reserva..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-primary text-primary-foreground">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};