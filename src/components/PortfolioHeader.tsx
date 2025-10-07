import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react";

interface PortfolioHeaderProps {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
}

export const PortfolioHeader = ({
  totalInvestment,
  totalPresentValue,
  totalGainLoss,
  gainLossPercentage,
}: PortfolioHeaderProps) => {
  const isPositive = totalGainLoss >= 0;

  const stats = [
    {
      title: "Total Investment",
      value: `₹${totalInvestment.toLocaleString()}`,
      icon: Wallet,
      description: "Your total capital invested",
      color: "text-blue-500",
    },
    {
      title: "Present Value",
      value: `₹${totalPresentValue.toLocaleString()}`,
      icon: PieChart,
      description: "Current portfolio worth",
      color: "text-purple-500",
    },
    {
      title: "Total Gain/Loss",
      value: `${isPositive ? '+' : ''}₹${totalGainLoss.toLocaleString()}`,
      icon: isPositive ? TrendingUp : TrendingDown,
      description: "Overall profit/loss",
      color: isPositive ? "text-success" : "text-destructive",
    },
    {
      title: "Return Percentage",
      value: `${isPositive ? '+' : ''}${gainLossPercentage.toFixed(2)}%`,
      icon: isPositive ? TrendingUp : TrendingDown,
      description: "Portfolio performance",
      color: isPositive ? "text-success" : "text-destructive",
    },
  ];

  return (
    <div className="mb-8 space-y-6">
      <div>
        <h1 className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
          Portfolio Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Real-time portfolio tracking and comprehensive analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <CardDescription className="text-xs">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
