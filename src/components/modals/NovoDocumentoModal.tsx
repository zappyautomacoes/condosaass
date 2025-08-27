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
import { Upload, CalendarIcon, FileText, Bell, X, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface NovoDocumentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovoDocumentoModal = ({ open, onOpenChange }: NovoDocumentoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    tipoDocumento: "",
    dataEmissao: null as Date | null,
    dataVencimento: null as Date | null,
    responsavel: "",
    descricao: "",
    alertaVencimento: false,
    diasAntecedencia: "30",
    compartilhado: false,
    tags: ""
  });
  
  const [arquivoPDF, setArquivoPDF] = useState<File | null>(null);

  const categorias = [
    "Atas",
    "Alvarás",
    "Licenças",
    "Seguros",
    "Contratos",
    "Certidões",
    "Comprovantes",
    "Outros"
  ];

  const tiposDocumento = [
    "Ata de Assembleia",
    "Alvará de Funcionamento",
    "Licença de Instalação",
    "Apólice de Seguro",
    "Contrato de Serviço",
    "Certidão Negativa",
    "Comprovante de Pagamento",
    "Documento Técnico",
    "Outros"
  ];

  const responsaveisMock = [
    "João Silva - Síndico",
    "Maria Santos - Administradora",
    "Carlos Lima - Porteiro",
    "Ana Costa - Zeladora"
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
      if (file.size > 20 * 1024 * 1024) { // 20MB
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 20MB.",
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
    if (!formData.nome || !formData.categoria || !formData.tipoDocumento || !arquivoPDF) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios e adicione o documento PDF.",
        variant: "destructive",
      });
      return;
    }

    if (formData.dataVencimento && formData.dataEmissao && formData.dataVencimento <= formData.dataEmissao) {
      toast({
        title: "Datas inválidas", 
        description: "A data de vencimento deve ser posterior à data de emissão.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    console.log("Dados do documento:", formData);
    console.log("Arquivo PDF:", arquivoPDF);

    toast({
      title: "Documento cadastrado!",
      description: "O documento foi adicionado ao arquivo digital.",
    });

    onOpenChange(false);
    // Reset form
    setFormData({
      nome: "",
      categoria: "",
      tipoDocumento: "",
      dataEmissao: null,
      dataVencimento: null,
      responsavel: "",
      descricao: "",
      alertaVencimento: false,
      diasAntecedencia: "30",
      compartilhado: false,
      tags: ""
    });
    setArquivoPDF(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Novo Documento
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Dados Básicos */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Documento *</Label>
              <Input
                id="nome"
                placeholder="Ex: Ata da Assembleia - Janeiro 2024"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
              <Select value={formData.tipoDocumento} onValueChange={(value) => setFormData({ ...formData, tipoDocumento: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposDocumento.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="responsavel">Responsável Vinculado</Label>
              <Select value={formData.responsavel} onValueChange={(value) => setFormData({ ...formData, responsavel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  {responsaveisMock.map((responsavel) => (
                    <SelectItem key={responsavel} value={responsavel}>
                      {responsavel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                placeholder="Ex: assembleia, votação, aprovação"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Breve descrição do documento..."
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Coluna Direita - Datas e Configurações */}
          <div className="space-y-4">
            <div>
              <Label>Data de Emissão</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataEmissao ? format(formData.dataEmissao, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataEmissao}
                    onSelect={(date) => setFormData({ ...formData, dataEmissao: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Data de Vencimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataVencimento ? format(formData.dataVencimento, "PPP", { locale: ptBR }) : "Sem vencimento"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataVencimento}
                    onSelect={(date) => setFormData({ ...formData, dataVencimento: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Configurações de Compartilhamento */}
            <div className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="compartilhado"
                  checked={formData.compartilhado}
                  onCheckedChange={(checked) => setFormData({ ...formData, compartilhado: checked })}
                />
                <Label htmlFor="compartilhado">
                  Documento Compartilhado
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Documentos compartilhados ficam visíveis para todos os usuários do sistema
              </p>
            </div>

            {/* Alerta de Vencimento */}
            <div className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="alertaVencimento"
                  checked={formData.alertaVencimento}
                  onCheckedChange={(checked) => setFormData({ ...formData, alertaVencimento: checked })}
                />
                <Label htmlFor="alertaVencimento" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Alerta de Vencimento
                </Label>
              </div>
              
              {formData.alertaVencimento && (
                <div>
                  <Label htmlFor="diasAntecedencia">Dias de antecedência</Label>
                  <Select value={formData.diasAntecedencia} onValueChange={(value) => setFormData({ ...formData, diasAntecedencia: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="15">15 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Upload do Documento */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Upload do Documento (PDF) *</Label>
              
              {!arquivoPDF ? (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Clique para selecionar o arquivo PDF</p>
                  <p className="text-xs text-muted-foreground mb-3">Tamanho máximo: 20MB</p>
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

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Adicionar Documento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoDocumentoModal;