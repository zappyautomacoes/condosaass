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
import { Upload, CalendarIcon, FileText, Bell, X, Award, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface NovaCertificacaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovaCertificacaoModal = ({ open, onOpenChange }: NovaCertificacaoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tipo: "",
    categoria: "",
    orgaoEmissor: "",
    numeroDocumento: "",
    dataEmissao: null as Date | null,
    dataVencimento: null as Date | null,
    valorRenovacao: "",
    responsavel: "",
    observacoes: "",
    alertaRenovacao: false,
    diasAntecedencia: "30"
  });
  
  const [arquivoPDF, setArquivoPDF] = useState<File | null>(null);

  const categorias = [
    "Alvarás",
    "Seguros",
    "Equipamentos",
    "Licenças",
    "Certificações Técnicas",
    "Outros"
  ];

  const tiposPorCategoria = {
    "Alvarás": [
      "Alvará de Funcionamento",
      "Alvará de Construção",
      "Alvará Sanitário"
    ],
    "Seguros": [
      "Seguro Incêndio",
      "Seguro Responsabilidade Civil",
      "Seguro de Equipamentos",
      "Seguro Predial"
    ],
    "Equipamentos": [
      "Certificado de Elevador",
      "Certificado de Gerador",
      "Certificado de Piscina",
      "Certificado de SPDA"
    ],
    "Licenças": [
      "Licença de Instalação GLP",
      "Licença Ambiental",
      "Licença de Funcionamento"
    ],
    "Certificações Técnicas": [
      "AVCB - Auto de Vistoria do Corpo de Bombeiros",
      "Laudo Técnico de Estrutura",
      "Certificação ISO",
      "NR-10 - Instalações Elétricas"
    ],
    "Outros": [
      "Outros"
    ]
  };

  const orgaosEmissores = [
    "Prefeitura Municipal",
    "Corpo de Bombeiros",
    "CREA",
    "Anvisa",
    "CETESB",
    "Receita Federal",
    "Seguradora Brasil",
    "Outros"
  ];

  const responsaveisMock = [
    "João Silva - Síndico",
    "Maria Santos - Administradora",
    "Carlos Lima - Zelador",
    "Ana Costa - Portaria"
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
      if (file.size > 15 * 1024 * 1024) { // 15MB
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 15MB.",
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

  const generateDocumentNumber = () => {
    const prefixo = formData.categoria.substring(0, 3).toUpperCase();
    const ano = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    const numeroDoc = `${prefixo}-${ano}-${randomNum.toString().padStart(4, '0')}`;
    setFormData({ ...formData, numeroDocumento: numeroDoc });
  };

  const tiposDisponiveis = formData.categoria ? tiposPorCategoria[formData.categoria as keyof typeof tiposPorCategoria] || [] : [];

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.tipo || !formData.categoria || !formData.orgaoEmissor || !formData.numeroDocumento || !arquivoPDF) {
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
    console.log("Dados da certificação:", formData);
    console.log("Arquivo PDF:", arquivoPDF);

    toast({
      title: "Certificação cadastrada!",
      description: "A certificação foi adicionada com sucesso.",
    });

    onOpenChange(false);
    // Reset form
    setFormData({
      tipo: "",
      categoria: "",
      orgaoEmissor: "",
      numeroDocumento: "",
      dataEmissao: null,
      dataVencimento: null,
      valorRenovacao: "",
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
            <Award className="w-5 h-5" />
            Nova Certificação
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Dados Básicos */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="categoria">Categoria *</Label>
              <Select 
                value={formData.categoria} 
                onValueChange={(value) => setFormData({ ...formData, categoria: value, tipo: "" })}
              >
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
              <Label htmlFor="tipo">Tipo de Documento *</Label>
              <Select 
                value={formData.tipo} 
                onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                disabled={!formData.categoria}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione primeiro a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {tiposDisponiveis.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="orgaoEmissor">Órgão Responsável *</Label>
              <Select value={formData.orgaoEmissor} onValueChange={(value) => setFormData({ ...formData, orgaoEmissor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o órgão emissor" />
                </SelectTrigger>
                <SelectContent>
                  {orgaosEmissores.map((orgao) => (
                    <SelectItem key={orgao} value={orgao}>
                      {orgao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="numeroDocumento">Número do Documento *</Label>
              <div className="flex gap-2">
                <Input
                  id="numeroDocumento"
                  placeholder="Ex: ALV-2024-0001"
                  value={formData.numeroDocumento}
                  onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                />
                <Button type="button" variant="outline" size="sm" onClick={generateDocumentNumber}>
                  Gerar
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="responsavel">Responsável Interno</Label>
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
              <Label htmlFor="valorRenovacao">Valor da Renovação</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="valorRenovacao"
                  placeholder="0,00"
                  className="pl-10"
                  value={formData.valorRenovacao}
                  onChange={(e) => setFormData({ ...formData, valorRenovacao: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Coluna Direita - Datas e Configurações */}
          <div className="space-y-4">
            <div>
              <Label>Data de Emissão *</Label>
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
              <Label>Data de Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataVencimento ? format(formData.dataVencimento, "PPP", { locale: ptBR }) : "Selecione a data"}
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
                      <SelectItem value="120">120 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Upload do Documento */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Upload da Certificação (PDF) *</Label>
              
              {!arquivoPDF ? (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Clique para selecionar o arquivo PDF</p>
                  <p className="text-xs text-muted-foreground mb-3">Tamanho máximo: 15MB</p>
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

            {/* Observações */}
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Observações sobre a certificação, condições especiais, etc..."
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Cadastrar Certificação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaCertificacaoModal;