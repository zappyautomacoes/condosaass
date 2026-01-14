import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
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
    primary: {
      icon: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/20 to-primary/5",
      glow: "group-hover:shadow-primary/20"
    },
    accent: {
      icon: "text-accent",
      bg: "bg-accent/10",
      gradient: "from-accent/20 to-accent/5",
      glow: "group-hover:shadow-accent/20"
    },
    success: {
      icon: "text-success",
      bg: "bg-success/10",
      gradient: "from-success/20 to-success/5",
      glow: "group-hover:shadow-success/20"
    },
    warning: {
      icon: "text-warning",
      bg: "bg-warning/10",
      gradient: "from-warning/20 to-warning/5",
      glow: "group-hover:shadow-warning/20"
    }
  };

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-success bg-success/10" : "text-destructive bg-destructive/10";
  const colors = colorClasses[color];

  return (
    <Card className={cn(
      "group relative p-5 md:p-6 border-0 shadow-lg rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-card via-card to-muted/10",
      "transition-all duration-300 ease-out",
      "hover:shadow-xl hover:-translate-y-1",
      colors.glow
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2",
        colors.bg
      )} />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-2 truncate">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            {value}
          </p>
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
            trendColor
          )}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{change}</span>
            <span className="text-muted-foreground/70 ml-0.5">vs mês anterior</span>
          </div>
        </div>
        
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
          "bg-gradient-to-br shadow-lg transition-all duration-300",
          "group-hover:scale-110 group-hover:shadow-xl",
          colors.gradient
        )}>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.bg)}>
            <Icon className={cn("w-5 h-5", colors.icon)} />
          </div>
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
};
