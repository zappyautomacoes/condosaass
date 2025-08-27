import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CadastrarCondominioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CadastrarCondominioModal = ({ open, onOpenChange }: CadastrarCondominioModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cnpj: "",
    unidades: "",
    sindico: "",
    telefone: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Condomínio cadastrado!",
      description: `${formData.nome} foi adicionado com sucesso.`,
    });
    setFormData({
      nome: "",
      endereco: "",
      cnpj: "",
      unidades: "",
      sindico: "",
      telefone: "",
      email: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <DialogTitle>Cadastrar Condomínio</DialogTitle>
          </div>
          <DialogDescription>
            Preencha os dados do novo condomínio que será gerenciado.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Condomínio</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Residencial Aurora"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                placeholder="00.000.000/0001-00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço Completo</Label>
            <Textarea
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              placeholder="Rua das Flores, 123 - Bairro Jardim - Cidade/UF"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unidades">Nº de Unidades</Label>
              <Input
                id="unidades"
                type="number"
                value={formData.unidades}
                onChange={(e) => setFormData({...formData, unidades: e.target.value})}
                placeholder="120"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sindico">Nome do Síndico</Label>
              <Input
                id="sindico"
                value={formData.sindico}
                onChange={(e) => setFormData({...formData, sindico: e.target.value})}
                placeholder="João Silva"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="sindico@email.com"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar Condomínio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};