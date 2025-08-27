import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Award, Upload, Calendar, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Certificacao } from "@/contexts/DataContext";

interface EditarCertificacaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificacao: Certificacao | null;
}

const EditarCertificacaoModal = ({ open, onOpenChange, certificacao }: EditarCertificacaoModalProps) => {
  const { toast } = useToast();
  const [novoArquivo, setNovoArquivo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    categoria: "",
    orgaoEmissor: "",
    numeroDocumento: "",
    dataEmissao: "",
    dataVencimento: "",
    valorRenovacao: "",
    responsavel: "",
    observacoes: "",
    alertaRenovacao: false,
    diasAntecedencia: ""
  });

  useEffect(() => {
    if (certificacao) {
      setFormData({
        tipo: certificacao.tipo,
        categoria: certificacao.categoria,
        orgaoEmissor: certificacao.orgaoEmissor,
        numeroDocumento: certificacao.numeroDocumento,
        dataEmissao: certificacao.dataEmissao,
        dataVencimento: certificacao.dataVencimento,
        valorRenovacao: certificacao.valorRenovacao.toString(),
        responsavel: certificacao.responsavel,
        observacoes: certificacao.observacoes || "",
        alertaRenovacao: certificacao.alertaRenovacao || false,
        diasAntecedencia: certificacao.diasAntecedencia || ""
      });
      setNovoArquivo(null);
    }
  }, [certificacao]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Formato inválido",
          description: "Apenas arquivos PDF são permitidos",
          variant: "destructive",
        });
        return;
      }
      setNovoArquivo(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.orgaoEmissor || !formData.numeroDocumento) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a integração com o banco de dados
    console.log('Editando certificação:', { 
      id: certificacao?.id, 
      formData, 
      novoArquivo 
    });
    
    toast({
      title: "Certificação atualizada",
      description: "Dados da certificação atualizados com sucesso",
    });
    
    onOpenChange(false);
  };

  if (!certificacao) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Editar Certificação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Arquivo Atual */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Certificação Atual</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="w-4 h-4" />
              <span>{certificacao.tipo}</span>
              <span>•</span>
              <span>{certificacao.numeroDocumento}</span>
              <span>•</span>
              <span>PDF</span>
            </div>
          </div>

          {/* Substituir Arquivo */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Substituir Documento (Opcional)
            </h4>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Escolher novo PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {novoArquivo && (
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                <FileText className="w-4 h-4 text-success" />
                <div>
                  <p className="text-sm font-medium text-success">Novo arquivo selecionado:</p>
                  <p className="text-xs text-muted-foreground">
                    {novoArquivo.name} • {(novoArquivo.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Documento *</Label>
              <Input
                id="tipo"
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alvarás">Alvarás</SelectItem>
                  <SelectItem value="Seguros">Seguros</SelectItem>
                  <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="Licenças">Licenças</SelectItem>
                  <SelectItem value="Atas">Atas</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgaoEmissor">Órgão Emissor *</Label>
              <Input
                id="orgaoEmissor"
                value={formData.orgaoEmissor}
                onChange={(e) => setFormData({...formData, orgaoEmissor: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroDocumento">Número do Documento *</Label>
              <Input
                id="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={(e) => setFormData({...formData, numeroDocumento: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataEmissao">Data de Emissão</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dataEmissao"
                  type="date"
                  value={formData.dataEmissao}
                  onChange={(e) => setFormData({...formData, dataEmissao: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataVencimento">Data de Vencimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dataVencimento"
                  type="date"
                  value={formData.dataVencimento}
                  onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Valor e Responsável */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorRenovacao">Valor de Renovação (R$)</Label>
              <Input
                id="valorRenovacao"
                type="number"
                step="0.01"
                value={formData.valorRenovacao}
                onChange={(e) => setFormData({...formData, valorRenovacao: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável Interno</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
              />
            </div>
          </div>

          {/* Configurações de Alerta */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Configurações de Alerta</h4>
            
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="alertaRenovacao">Alerta de Renovação</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações antes do vencimento
                </p>
              </div>
              <Switch
                id="alertaRenovacao"
                checked={formData.alertaRenovacao}
                onCheckedChange={(checked) => setFormData({...formData, alertaRenovacao: checked})}
              />
            </div>

            {formData.alertaRenovacao && (
              <div className="space-y-2">
                <Label htmlFor="diasAntecedencia">Dias de Antecedência</Label>
                <Select value={formData.diasAntecedencia} onValueChange={(value) => setFormData({...formData, diasAntecedencia: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os dias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Informações adicionais sobre a certificação..."
              rows={3}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
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

export default EditarCertificacaoModal;