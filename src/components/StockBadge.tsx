import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockBadgeProps {
  gainLoss: number;
  gainLossPercentage: number;
}

export const StockBadge = ({ gainLoss, gainLossPercentage }: StockBadgeProps) => {
  const isPositive = gainLoss >= 0;
  
  return (
    <Badge 
      variant={isPositive ? "default" : "destructive"}
      className={`flex items-center gap-1 ${
        isPositive 
          ? 'bg-success/20 text-success hover:bg-success/30 border-success/30' 
          : 'bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/30'
      }`}
    >
      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {isPositive ? '+' : ''}{gainLossPercentage.toFixed(2)}%
    </Badge>
  );
};
