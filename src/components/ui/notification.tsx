import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  title: string;
  message: string;
  type?: "info" | "warning" | "success" | "error";
  timestamp?: string;
  onDismiss?: () => void;
  className?: string;
}

export const Notification = ({ 
  title, 
  message, 
  type = "info", 
  timestamp, 
  onDismiss,
  className 
}: NotificationProps) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "error":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <Card className={cn(
      "p-4 border-l-4",
      type === "warning" && "border-l-warning",
      type === "success" && "border-l-success", 
      type === "error" && "border-l-destructive",
      type === "info" && "border-l-primary",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getIcon()}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{title}</h4>
              <Badge className={getBadgeColor()}>
                {type === "warning" ? "Atenção" : 
                 type === "success" ? "Sucesso" :
                 type === "error" ? "Erro" : "Info"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>
            {timestamp && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timestamp}
              </p>
            )}
          </div>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

interface NotificationCenterProps {
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type?: "info" | "warning" | "success" | "error";
    timestamp?: string;
  }>;
  onDismiss?: (id: string) => void;
}

export const NotificationCenter = ({ notifications, onDismiss }: NotificationCenterProps) => {
  const [visibleNotifications, setVisibleNotifications] = useState(notifications);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleDismiss = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
    onDismiss?.(id);
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Notificações</h3>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          {visibleNotifications.length}
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {visibleNotifications.map((notification) => (
          <Notification
            key={notification.id}
            title={notification.title}
            message={notification.message}
            type={notification.type}
            timestamp={notification.timestamp}
            onDismiss={() => handleDismiss(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};