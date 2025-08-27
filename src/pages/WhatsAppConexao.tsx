import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MessageSquare,
  QrCode,
  Smartphone,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";

interface WhatsAppConnection {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "connecting";
  qrCode?: string;
  lastActivity?: Date;
  messagesCount: number;
}

const mockConnections: WhatsAppConnection[] = [
  {
    id: "1",
    name: "Residencial Aurora - Principal",
    status: "connected",
    lastActivity: new Date(),
    messagesCount: 24
  },
  {
    id: "2", 
    name: "Edifício Solar - Administração",
    status: "disconnected",
    lastActivity: new Date("2024-01-19"),
    messagesCount: 12
  }
];

const WhatsAppConexao = () => {
  const [connections, setConnections] = useState<WhatsAppConnection[]>(mockConnections);
  const [newConnectionName, setNewConnectionName] = useState("");
  const [isGeneratingQR, setIsGeneratingQR] = useState<string | null>(null);

  const handleGenerateQR = (connectionId?: string) => {
    if (connectionId) {
      setIsGeneratingQR(connectionId);
      // Simular geração de QR code
      setTimeout(() => {
        setConnections(prev => prev.map(conn => 
          conn.id === connectionId 
            ? { ...conn, qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", status: "connecting" }
            : conn
        ));
        setIsGeneratingQR(null);
      }, 2000);
    }
  };

  const handleCreateConnection = () => {
    if (!newConnectionName.trim()) return;
    
    const newConnection: WhatsAppConnection = {
      id: Date.now().toString(),
      name: newConnectionName,
      status: "disconnected",
      messagesCount: 0
    };
    
    setConnections([...connections, newConnection]);
    setNewConnectionName("");
    handleGenerateQR(newConnection.id);
  };

  const handleDeleteConnection = (id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id));
  };

  const getStatusIcon = (status: WhatsAppConnection["status"]) => {
    switch (status) {
      case "connected":
        return <Wifi className="w-4 h-4 text-success" />;
      case "connecting":
        return <RefreshCw className="w-4 h-4 text-warning animate-spin" />;
      case "disconnected":
        return <WifiOff className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: WhatsAppConnection["status"]) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-success/10 text-success border-success/20">Conectado</Badge>;
      case "connecting":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Conectando</Badge>;
      case "disconnected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Desconectado</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Conexões WhatsApp</h1>
              <p className="text-muted-foreground">Gerencie as conexões do WhatsApp com seus condomínios</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {connections.filter(c => c.status === "connected").length}
                </p>
                <p className="text-sm text-muted-foreground">Conectadas</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {connections.filter(c => c.status === "disconnected").length}
                </p>
                <p className="text-sm text-muted-foreground">Desconectadas</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {connections.reduce((total, conn) => total + conn.messagesCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Mensagens hoje</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Nova Conexão */}
        <Card className="p-6 bg-gradient-card border-0 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <Plus className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Nova Conexão</h2>
          </div>
          
          <div className="flex gap-3">
            <Input
              placeholder="Nome da conexão (ex: Residencial Aurora - Principal)"
              value={newConnectionName}
              onChange={(e) => setNewConnectionName(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleCreateConnection}
              disabled={!newConnectionName.trim()}
              className="bg-gradient-primary text-primary-foreground shadow-glow"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Gerar QR Code
            </Button>
          </div>

          <Alert className="mt-4">
            <Smartphone className="w-4 h-4" />
            <AlertDescription>
              Após gerar o QR Code, abra o WhatsApp no seu celular, vá em "Dispositivos Conectados" e escaneie o código para conectar.
            </AlertDescription>
          </Alert>
        </Card>

        {/* Lista de Conexões */}
        <div className="grid gap-4">
          {connections.map((connection) => (
            <Card key={connection.id} className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(connection.status)}
                    <h3 className="text-lg font-semibold text-foreground">
                      {connection.name}
                    </h3>
                    {getStatusBadge(connection.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Mensagens hoje:</span> {connection.messagesCount}
                    </div>
                    {connection.lastActivity && (
                      <div>
                        <span className="font-medium">Última atividade:</span> {connection.lastActivity.toLocaleString('pt-BR')}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">ID:</span> {connection.id}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {connection.status !== "connected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGenerateQR(connection.id)}
                      disabled={isGeneratingQR === connection.id}
                    >
                      {isGeneratingQR === connection.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <QrCode className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteConnection(connection.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {connection.qrCode && connection.status === "connecting" && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-white p-4 rounded-lg shadow-soft">
                      <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Como conectar:</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li>1. Abra o WhatsApp no seu celular</li>
                        <li>2. Toque em "Menu" (três pontos) → "Dispositivos conectados"</li>
                        <li>3. Toque em "Conectar um dispositivo"</li>
                        <li>4. Aponte a câmera para este QR Code</li>
                      </ol>
                    </div>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>

        {connections.length === 0 && (
          <Card className="p-12 bg-gradient-card border-0 shadow-soft text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma conexão configurada
            </h3>
            <p className="text-muted-foreground mb-6">
              Crie sua primeira conexão do WhatsApp para começar a receber mensagens dos condomínios
            </p>
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Criar primeira conexão
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WhatsAppConexao;