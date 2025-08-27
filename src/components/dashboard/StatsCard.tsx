import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "warning";
}

export const StatsCard = ({ title, value, change, trend, icon: Icon, color }: StatsCardProps) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10"
  };

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-success" : "text-destructive";

  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth">
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground mb-2">
            {value}
          </p>
          <div className="flex items-center gap-1">
            <TrendIcon className={cn("w-4 h-4", trendColor)} />
            <span className={cn("text-sm font-medium", trendColor)}>
              {change}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              vs mês anterior
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};