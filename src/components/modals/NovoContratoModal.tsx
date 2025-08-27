import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, CalendarIcon, DollarSign, FileText, Bell, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface NovoContratoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovoContratoModal = ({ open, onOpenChange }: NovoContratoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: "",
    fornecedor: "",
    tipoServico: "",
    valor: "",
    dataInicio: null as Date | null,
    dataTermino: null as Date | null,
    status: "ativo",
    responsavel: "",
    observacoes: "",
    alertaRenovacao: false,
    diasAntecedencia: "30"
  });
  
  const [arquivoPDF, setArquivoPDF] = useState<File | null>(null);

  const fornecedoresMock = [
    "Elevadores Tech LTDA",
    "Limpeza Total S.A.",
    "Segurança Plus",
    "Jardinagem Verde LTDA"
  ];

  const tiposServico = [
    "Manutenção de Elevadores",
    "Limpeza e Conservação",
    "Segurança e Portaria",
    "Jardinagem",
    "Manutenção Predial",
    "Outros"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Erro no arquivo",
          description: "Por favor, selecione apenas arquivos PDF.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }
      setArquivoPDF(file);
    }
  };

  const removeFile = () => {
    setArquivoPDF(null);
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.titulo || !formData.fornecedor || !formData.valor || !formData.dataInicio || !formData.dataTermino) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (formData.dataTermino <= formData.dataInicio) {
      toast({
        title: "Datas inválidas",
        description: "A data de término deve ser posterior à data de início.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    console.log("Dados do contrato:", formData);
    console.log("Arquivo PDF:", arquivoPDF);

    toast({
      title: "Contrato cadastrado!",
      description: "O contrato foi cadastrado com sucesso.",
    });

    onOpenChange(false);
    // Reset form
    setFormData({
      titulo: "",
      fornecedor: "",
      tipoServico: "",
      valor: "",
      dataInicio: null,
      dataTermino: null,
      status: "ativo",
      responsavel: "",
      observacoes: "",
      alertaRenovacao: false,
      diasAntecedencia: "30"
    });
    setArquivoPDF(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Novo Contrato
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Dados Básicos */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="titulo">Título do Contrato *</Label>
              <Input
                id="titulo"
                placeholder="Ex: Contrato de Manutenção de Elevadores"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Select value={formData.fornecedor} onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {fornecedoresMock.map((fornecedor) => (
                    <SelectItem key={fornecedor} value={fornecedor}>
                      {fornecedor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tipoServico">Tipo de Serviço</Label>
              <Select value={formData.tipoServico} onValueChange={(value) => setFormData({ ...formData, tipoServico: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de serviço" />
                </SelectTrigger>
                <SelectContent>
                  {tiposServico.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="valor">Valor do Contrato *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="valor"
                  placeholder="0,00"
                  className="pl-10"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                placeholder="Nome do responsável"
                value={formData.responsavel}
                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
              />
            </div>
          </div>

          {/* Coluna Direita - Datas e Configurações */}
          <div className="space-y-4">
            <div>
              <Label>Data de Início *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataInicio ? format(formData.dataInicio, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataInicio}
                    onSelect={(date) => setFormData({ ...formData, dataInicio: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Data de Término *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataTermino ? format(formData.dataTermino, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataTermino}
                    onSelect={(date) => setFormData({ ...formData, dataTermino: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="suspenso">Suspenso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alerta de Renovação */}
            <div className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="alertaRenovacao"
                  checked={formData.alertaRenovacao}
                  onCheckedChange={(checked) => setFormData({ ...formData, alertaRenovacao: checked })}
                />
                <Label htmlFor="alertaRenovacao" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Alerta de Renovação
                </Label>
              </div>
              
              {formData.alertaRenovacao && (
                <div>
                  <Label htmlFor="diasAntecedencia">Dias de antecedência</Label>
                  <Select value={formData.diasAntecedencia} onValueChange={(value) => setFormData({ ...formData, diasAntecedencia: value })}>
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

            {/* Upload do Contrato */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Upload do Contrato (PDF)</Label>
              
              {!arquivoPDF ? (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Clique para selecionar o arquivo PDF</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm">
                      Selecionar PDF
                    </Button>
                  </Label>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">{arquivoPDF.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {(arquivoPDF.size / 1024 / 1024).toFixed(2)} MB
                    </Badge>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Observações - Largura Total */}
        <div className="mt-6">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            placeholder="Observações adicionais sobre o contrato..."
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            rows={3}
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Cadastrar Contrato
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoContratoModal;