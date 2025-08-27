import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnviarComunicadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EnviarComunicadoModal = ({ open, onOpenChange }: EnviarComunicadoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    condominio: "",
    titulo: "",
    mensagem: "",
    agendarEnvio: false,
    dataEnvio: "",
    horaEnvio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Comunicado enviado!",
      description: formData.agendarEnvio 
        ? "Comunicado agendado com sucesso." 
        : "Mensagem enviada para todos os moradores.",
    });
    setFormData({
      condominio: "",
      titulo: "",
      mensagem: "",
      agendarEnvio: false,
      dataEnvio: "",
      horaEnvio: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            <DialogTitle>Enviar Comunicado</DialogTitle>
          </div>
          <DialogDescription>
            Envie uma mensagem para todos os moradores via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="condominio">Condomínio</Label>
            <Select value={formData.condominio} onValueChange={(value) => setFormData({...formData, condominio: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o condomínio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Condomínios</SelectItem>
                <SelectItem value="residencial-aurora">Residencial Aurora</SelectItem>
                <SelectItem value="torre-azul">Torre Azul</SelectItem>
                <SelectItem value="jardim-botanico">Jardim Botânico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo">Título do Comunicado</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              placeholder="Ex: Manutenção Programada"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
              placeholder="Digite aqui a mensagem que será enviada para todos os moradores..."
              rows={5}
              required
            />
            <p className="text-xs text-muted-foreground">
              A mensagem será enviada via WhatsApp automaticamente
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="agendar"
              checked={formData.agendarEnvio}
              onCheckedChange={(checked) => setFormData({...formData, agendarEnvio: checked as boolean})}
            />
            <Label htmlFor="agendar">Agendar envio</Label>
          </div>

          {formData.agendarEnvio && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataEnvio">Data do Envio</Label>
                <Input
                  id="dataEnvio"
                  type="date"
                  value={formData.dataEnvio}
                  onChange={(e) => setFormData({...formData, dataEnvio: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horaEnvio">Horário</Label>
                <Input
                  id="horaEnvio"
                  type="time"
                  value={formData.horaEnvio}
                  onChange={(e) => setFormData({...formData, horaEnvio: e.target.value})}
                  required
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {formData.agendarEnvio ? "Agendar" : "Enviar"} Comunicado
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};