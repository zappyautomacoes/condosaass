import { Card, CardContent } from "@/components/ui/card";
import { Shield, Camera, AlertTriangle, Users } from "lucide-react";

const Seguranca = () => {
  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Segurança</h1>
          <p className="text-muted-foreground mt-1">Central de monitoramento e controle de segurança</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Câmeras Ativas</p>
                  <p className="text-2xl font-bold text-success">16</p>
                </div>
                <Camera className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alertas Hoje</p>
                  <p className="text-2xl font-bold text-warning">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Seguranca;