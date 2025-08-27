import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings,
  Bot,
  MessageSquare,
  Upload,
  Key,
  Save,
  TestTube,
  Smartphone,
  Brain,
  FileText,
  Zap
} from "lucide-react";

const Configuracoes = () => {
  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              IA & Configurações
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure integrações, IA e automação do sistema
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <TestTube className="w-4 h-4 mr-2" />
              Testar IA
            </Button>
            <Button size="sm" className="bg-gradient-accent text-accent-foreground shadow-accent-glow">
              <Save className="w-4 h-4 mr-2" />
              Salvar Tudo
            </Button>
          </div>
        </div>

        <Tabs defaultValue="whatsapp" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="ia" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              IA & Prompts
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="automacao" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Automação
            </TabsTrigger>
          </TabsList>

          {/* WhatsApp Configuration */}
          <TabsContent value="whatsapp" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Evolution API - WhatsApp
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure a conexão com o WhatsApp Business
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="evolution-endpoint">Endpoint da API</Label>
                    <Input
                      id="evolution-endpoint"
                      placeholder="https://api.evolution.com.br"
                      defaultValue="https://api.evolution.com.br"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="evolution-key">API Key</Label>
                    <Input
                      id="evolution-key"
                      type="password"
                      placeholder="Sua chave da Evolution API"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instance-name">Nome da Instância</Label>
                    <Input
                      id="instance-name"
                      placeholder="condosass-bot"
                      defaultValue="condosass-bot"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-response" defaultChecked />
                    <Label htmlFor="auto-response">
                      Respostas automáticas ativas
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="font-medium text-success">Conectado</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      WhatsApp conectado e funcionando
                    </p>
                    <Button variant="outline" size="sm">
                      <TestTube className="w-4 h-4 mr-2" />
                      Testar Conexão
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Estatísticas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mensagens hoje:</span>
                        <span className="font-medium">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Automação:</span>
                        <span className="font-medium text-success">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium text-success">99.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* IA Configuration */}
          <TabsContent value="ia" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Configuração da IA
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure o comportamento e prompts da inteligência artificial
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ia-provider">Provedor de IA</Label>
                      <Input
                        id="ia-provider"
                        placeholder="OpenAI / Gemini / Anthropic"
                        defaultValue="OpenAI"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ia-key">API Key da IA</Label>
                      <Input
                        id="ia-key"
                        type="password"
                        placeholder="sk-..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ia-model">Modelo</Label>
                      <Input
                        id="ia-model"
                        placeholder="gpt-4"
                        defaultValue="gpt-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Classificações Ativas</h4>
                    <div className="space-y-2">
                      {[
                        "Boleto/Financeiro",
                        "Reserva de Espaço", 
                        "Manutenção",
                        "Assembleia",
                        "Dados Cadastrais",
                        "Mudança",
                        "Visitante",
                        "Transferir para Humano"
                      ].map((categoria) => (
                        <div key={categoria} className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">{categoria}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="prompt-principal">Prompt Principal do Atendente</Label>
                  <Textarea
                    id="prompt-principal"
                    rows={6}
                    placeholder="Você é um assistente virtual especializado em gestão condominial..."
                    defaultValue="Você é um assistente virtual especializado em gestão condominial. Sua função é atender moradores com cordialidade e eficiência, classificando suas solicitações e fornecendo informações precisas sobre o condomínio. Sempre seja educado, claro e objetivo nas respostas."
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="prompt-classificacao">Prompt de Classificação de Intenções</Label>
                  <Textarea
                    id="prompt-classificacao"
                    rows={4}
                    placeholder="Classifique a mensagem do usuário nas seguintes categorias..."
                    defaultValue="Classifique a mensagem do usuário nas seguintes categorias: boleto, reserva, manutenção, assembleia, comunicado, dados_cadastrais, mudança, visitante, humano, outros. Retorne apenas a categoria."
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documentos" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Base de Conhecimento
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload de documentos para treinar a IA com informações específicas
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-medium text-foreground mb-2">
                    Faça upload dos documentos
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Regulamentos, manuais, políticas internas (PDF, DOC, TXT)
                  </p>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar Arquivos
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Documentos Enviados</h4>
                  <div className="space-y-2">
                    {[
                      { nome: "Regulamento Interno.pdf", tamanho: "2.3 MB", status: "Processado" },
                      { nome: "Manual do Morador.docx", tamanho: "1.8 MB", status: "Processando..." },
                      { nome: "Normas da Piscina.txt", tamanho: "45 KB", status: "Processado" }
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{doc.nome}</p>
                            <p className="text-xs text-muted-foreground">{doc.tamanho}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            doc.status === "Processado" 
                              ? "bg-success/10 text-success" 
                              : "bg-warning/10 text-warning"
                          }`}>
                            {doc.status}
                          </span>
                          <Button variant="outline" size="sm">
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Automation */}
          <TabsContent value="automacao" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Mensagens Automáticas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure envios recorrentes e triggers automáticos
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Cobranças Automáticas</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Lembrete de Vencimento</p>
                          <p className="text-xs text-muted-foreground">3 dias antes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Boleto Vencido</p>
                          <p className="text-xs text-muted-foreground">1 dia após vencimento</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Segunda Via</p>
                          <p className="text-xs text-muted-foreground">7 dias após vencimento</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Outras Automações</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Confirmação de Reserva</p>
                          <p className="text-xs text-muted-foreground">Imediata</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Convite para Assembleia</p>
                          <p className="text-xs text-muted-foreground">7 dias antes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Boas-vindas</p>
                          <p className="text-xs text-muted-foreground">Novos moradores</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="template-cobranca">Template - Cobrança</Label>
                  <Textarea
                    id="template-cobranca"
                    rows={4}
                    placeholder="Olá {nome}, seu boleto referente ao apartamento {apartamento}..."
                    defaultValue="Olá {nome}! 💙

Seu boleto referente ao apartamento {apartamento} vence em {diasVencimento} dias.

💰 Valor: {valor}
📅 Vencimento: {dataVencimento}

Para pagar via PIX ou baixar o boleto, acesse: {linkPagamento}

Alguma dúvida? Estou aqui para ajudar!"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Configuracoes;