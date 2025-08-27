import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useData, Contrato } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

interface EditarContratoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contrato: Contrato | null;
}

const EditarContratoModal = ({ open, onOpenChange, contrato }: EditarContratoModalProps) => {
  const { state, dispatch } = useData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: "",
    fornecedor: "",
    servico: "",
    valor: "",
    dataInicio: null as Date | null,
    dataTermino: null as Date | null,
    responsavel: "",
    observacoes: "",
    alertaRenovacao: false,
    diasAntecedencia: "30"
  });
  const [arquivoPDF, setArquivoPDF] = useState<File | null>(null);

  useEffect(() => {
    if (contrato) {
      setFormData({
        titulo: contrato.titulo || "",
        fornecedor: contrato.fornecedor || "",
        servico: contrato.servico || "",
        valor: contrato.valor.toString(),
        dataInicio: contrato.dataInicio ? new Date(contrato.dataInicio) : null,
        dataTermino: contrato.dataTermino ? new Date(contrato.dataTermino) : null,
        responsavel: contrato.responsavel || "",
        observacoes: contrato.observacoes || "",
        alertaRenovacao: contrato.alertaRenovacao || false,
        diasAntecedencia: contrato.diasAntecedencia || "30"
      });
    }
  }, [contrato]);

  const fornecedoresList = state.fornecedores.filter(f => f.status === "ativo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contrato) return;

    if (!formData.titulo || !formData.fornecedor || !formData.servico || !formData.valor || !formData.dataInicio || !formData.dataTermino) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const valorNumerico = parseFloat(formData.valor.replace(/[^\d,]/g, '').replace(',', '.'));
    if (isNaN(valorNumerico)) {
      toast({
        title: "Erro",
        description: "Valor inválido.",
        variant: "destructive",
      });
      return;
    }

    const hoje = new Date();
    const diasParaVencer = Math.ceil((formData.dataTermino.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    let status: 'ativo' | 'vencendo' | 'vencido' = 'ativo';
    if (diasParaVencer < 0) {
      status = 'vencido';
    } else if (diasParaVencer <= 30) {
      status = 'vencendo';
    }

    const contratoAtualizado: Contrato = {
      ...contrato,
      titulo: formData.titulo,
      fornecedor: formData.fornecedor,
      servico: formData.servico,
      valor: valorNumerico,
      dataInicio: formData.dataInicio.toISOString().split('T')[0],
      dataTermino: formData.dataTermino.toISOString().split('T')[0],
      responsavel: formData.responsavel,
      observacoes: formData.observacoes,
      alertaRenovacao: formData.alertaRenovacao,
      diasAntecedencia: formData.diasAntecedencia,
      status,
      diasParaVencer,
      arquivoPDF: arquivoPDF ? URL.createObjectURL(arquivoPDF) : contrato.arquivoPDF
    };

    dispatch({ type: 'UPDATE_CONTRATO', payload: contratoAtualizado });

    toast({
      title: "Sucesso",
      description: "Contrato atualizado com sucesso!",
    });

    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setArquivoPDF(file);
    } else {
      toast({
        title: "Erro",
        description: "Selecione apenas arquivos PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Contrato</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título do Contrato *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                placeholder="Ex: Manutenção de Elevadores - Anual"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Select value={formData.fornecedor} onValueChange={(value) => setFormData(prev => ({ ...prev, fornecedor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {fornecedoresList.map((fornecedor) => (
                    <SelectItem key={fornecedor.id} value={fornecedor.nome}>
                      {fornecedor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servico">Tipo de Serviço *</Label>
              <Input
                id="servico"
                value={formData.servico}
                onChange={(e) => setFormData(prev => ({ ...prev, servico: e.target.value }))}
                placeholder="Ex: Manutenção, Limpeza, Segurança"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor Total *</Label>
              <Input
                id="valor"
                value={formData.valor}
                onChange={(e) => setFormData(prev => ({ ...prev, valor: e.target.value }))}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataInicio ? format(formData.dataInicio, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataInicio || undefined}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dataInicio: date || null }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Data de Término *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataTermino ? format(formData.dataTermino, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dataTermino || undefined}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dataTermino: date || null }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input
              id="responsavel"
              value={formData.responsavel}
              onChange={(e) => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
              placeholder="Nome do responsável"
            />
          </div>

          <div className="space-y-2">
            <Label>Upload do Contrato (PDF)</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="arquivo"
              />
              <Label htmlFor="arquivo" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                  <Upload className="w-4 h-4" />
                  {arquivoPDF ? "Substituir PDF" : "Selecionar PDF"}
                </div>
              </Label>
              {arquivoPDF && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{arquivoPDF.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setArquivoPDF(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="alertaRenovacao"
                checked={formData.alertaRenovacao}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, alertaRenovacao: checked }))}
              />
              <Label htmlFor="alertaRenovacao">Ativar alerta de renovação</Label>
            </div>

            {formData.alertaRenovacao && (
              <div className="space-y-2">
                <Label htmlFor="diasAntecedencia">Dias de antecedência para alerta</Label>
                <Select value={formData.diasAntecedencia} onValueChange={(value) => setFormData(prev => ({ ...prev, diasAntecedencia: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações adicionais sobre o contrato..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditarContratoModal;