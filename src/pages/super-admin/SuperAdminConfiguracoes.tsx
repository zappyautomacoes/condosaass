import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Mail, CreditCard, FileText, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SuperAdminConfiguracoes = () => {
  const { toast } = useToast();
  const save = () => toast({ title: "Configurações salvas!" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-slate-400">Configurações gerais da plataforma</p>
      </div>

      <Tabs defaultValue="plataforma" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="plataforma" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"><Globe className="w-4 h-4 mr-1" /> Plataforma</TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"><Mail className="w-4 h-4 mr-1" /> E-mail</TabsTrigger>
          <TabsTrigger value="pagamento" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"><CreditCard className="w-4 h-4 mr-1" /> Pagamento</TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"><FileText className="w-4 h-4 mr-1" /> Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="plataforma">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-sm">Dados da Plataforma</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Nome da Plataforma</Label><Input defaultValue="Administre" className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Domínio</Label><Input defaultValue="app.administre.com.br" className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div className="col-span-2"><Label className="text-slate-300">URL do Logo</Label><Input defaultValue="https://administre.com.br/logo.png" className="bg-slate-700/50 border-slate-600 text-white" /></div>
              </div>
              <Button onClick={save} className="bg-violet-600 hover:bg-violet-700 text-white"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-sm">Configurações SMTP</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Servidor SMTP</Label><Input placeholder="smtp.exemplo.com" className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Porta</Label><Input placeholder="587" className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Usuário</Label><Input placeholder="noreply@administre.com.br" className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Senha</Label><Input type="password" className="bg-slate-700/50 border-slate-600 text-white" /></div>
              </div>
              <Button onClick={save} className="bg-violet-600 hover:bg-violet-700 text-white"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagamento">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-sm">Gateway de Pagamento</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-slate-300">Chave Pública</Label><Input placeholder="pk_live_..." className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Chave Secreta</Label><Input type="password" placeholder="sk_live_..." className="bg-slate-700/50 border-slate-600 text-white" /></div>
                <div className="col-span-2"><Label className="text-slate-300">Webhook URL</Label><Input placeholder="https://api.administre.com.br/webhooks/payment" className="bg-slate-700/50 border-slate-600 text-white" /></div>
              </div>
              <Button onClick={save} className="bg-violet-600 hover:bg-violet-700 text-white"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-sm">Templates de E-mail</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Boas-vindas — Administradora</Label>
                <Textarea placeholder="Olá {nome}, bem-vindo(a) à plataforma Administre..." className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]" />
              </div>
              <div>
                <Label className="text-slate-300">Boas-vindas — Síndico</Label>
                <Textarea placeholder="Olá {nome}, sua conta foi criada com sucesso..." className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]" />
              </div>
              <Button onClick={save} className="bg-violet-600 hover:bg-violet-700 text-white"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminConfiguracoes;
