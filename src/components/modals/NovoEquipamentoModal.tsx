import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Upload, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import { Equipamento } from "@/contexts/DataContext";

interface NovoEquipamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovoEquipamentoModal = ({ open, onOpenChange }: NovoEquipamentoModalProps) => {
  const { toast } = useToast();
  const { dispatch } = useData();
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "" as "extintor" | "alarme" | "luz_emergencia" | "porta_corta_fogo" | "outro" | "",
    localInstalacao: "",
    dataInstalacao: "",
    proximaManutencao: "",
    situacao: "ativo" as "ativo" | "manutencao" | "inativo",
    responsavel: "",
    fornecedor: "",
    numeroSerie: "",
    garantia: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.tipo || !formData.localInstalacao || !formData.dataInstalacao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novoEquipamento: Equipamento = {
      id: Date.now(),
      nome: formData.nome,
      tipo: formData.tipo as "extintor" | "alarme" | "luz_emergencia" | "porta_corta_fogo" | "outro",
      localInstalacao: formData.localInstalacao,
      dataInstalacao: formData.dataInstalacao,
      proximaManutencao: formData.proximaManutencao || undefined,
      situacao: formData.situacao,
      responsavel: formData.responsavel || undefined,
      fornecedor: formData.fornecedor || undefined,
      numeroSerie: formData.numeroSerie || undefined,
      garantia: formData.garantia || undefined,
      observacoes: formData.observacoes || undefined,
      documentos: [],
      fotos: []
    };

    dispatch({ type: 'ADD_EQUIPAMENTO', payload: novoEquipamento });
    
    toast({
      title: "Equipamento cadastrado",
      description: "O equipamento foi cadastrado com sucesso",
    });
    
    // Reset form
    setFormData({
      nome: "",
      tipo: "",
      localInstalacao: "",
      dataInstalacao: "",
      proximaManutencao: "",
      situacao: "ativo",
      responsavel: "",
      fornecedor: "",
      numeroSerie: "",
      garantia: "",
      observacoes: ""
    });
    
    onOpenChange(false);
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "extintor": return "Extintor";
      case "alarme": return "Sistema de Alarme";
      case "luz_emergencia": return "Luz de Emergência";
      case "porta_corta_fogo": return "Porta Corta-Fogo";
      case "outro": return "Outro";
      default: return tipo;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Cadastrar Novo Equipamento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Equipamento *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Ex: Extintor CO2 - Área Garagem"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Equipamento *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value as any})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extintor">Extintor</SelectItem>
                  <SelectItem value="alarme">Sistema de Alarme</SelectItem>
                  <SelectItem value="luz_emergencia">Luz de Emergência</SelectItem>
                  <SelectItem value="porta_corta_fogo">Porta Corta-Fogo</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="localInstalacao">Local de Instalação *</Label>
              <Input
                id="localInstalacao"
                value={formData.localInstalacao}
                onChange={(e) => setFormData({...formData, localInstalacao: e.target.value})}
                placeholder="Ex: Garagem - Coluna 12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroSerie">Número de Série</Label>
              <Input
                id="numeroSerie"
                value={formData.numeroSerie}
                onChange={(e) => setFormData({...formData, numeroSerie: e.target.value})}
                placeholder="Ex: EXT-2024-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataInstalacao">Data de Instalação *</Label>
              <Input
                id="dataInstalacao"
                type="date"
                value={formData.dataInstalacao}
                onChange={(e) => setFormData({...formData, dataInstalacao: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proximaManutencao">Próxima Manutenção</Label>
              <Input
                id="proximaManutencao"
                type="date"
                value={formData.proximaManutencao}
                onChange={(e) => setFormData({...formData, proximaManutencao: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="situacao">Situação Atual</Label>
              <Select value={formData.situacao} onValueChange={(value) => setFormData({...formData, situacao: value as any})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="manutencao">Em Manutenção</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="garantia">Garantia</Label>
              <Input
                id="garantia"
                value={formData.garantia}
                onChange={(e) => setFormData({...formData, garantia: e.target.value})}
                placeholder="Ex: 12 meses"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                placeholder="Nome do responsável"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Select value={formData.fornecedor} onValueChange={(value) => setFormData({...formData, fornecedor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Extintores Brasil LTDA">Extintores Brasil LTDA</SelectItem>
                  <SelectItem value="Segurança Plus">Segurança Plus</SelectItem>
                  <SelectItem value="Iluminação Tech">Iluminação Tech</SelectItem>
                  <SelectItem value="Portas Seguras LTDA">Portas Seguras LTDA</SelectItem>
                  <SelectItem value="Detectores Pro">Detectores Pro</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload de Arquivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Documentos (PDF)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Arraste arquivos PDF aqui ou <span className="text-primary cursor-pointer">clique para selecionar</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Certificados, manuais, notas fiscais
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fotos do Equipamento</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Arraste fotos aqui ou <span className="text-primary cursor-pointer">clique para selecionar</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, máximo 5MB cada
                </p>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Adicionais</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Informações complementares sobre o equipamento..."
              rows={3}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Cadastrar Equipamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovoEquipamentoModal;