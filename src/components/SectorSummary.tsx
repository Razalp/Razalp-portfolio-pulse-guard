import { SectorSummary as SectorSummaryType } from "@/types/stock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Layers } from "lucide-react";

interface SectorSummaryProps {
  sectors: SectorSummaryType[];
}

const sectorIcons: Record<string, string> = {
  'Energy': '⚡',
  'Financials': '💰',
  'Technology': '💻',
  'Consumer Goods': '🛍️',
  'Healthcare': '🏥',
  'Industrials': '🏭',
};

export const SectorSummary = ({ sectors }: SectorSummaryProps) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-3">
        <Layers className="w-6 h-6 text-accent" />
        <h2 className="text-3xl font-bold">Sector Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, index) => {
          const isPositive = sector.totalGainLoss >= 0;
          return (
            <Card
              key={sector.sector}
              className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="text-2xl">{sectorIcons[sector.sector] || '📊'}</span>
                    {sector.sector}
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono">
                    {sector.stocks.length} {sector.stocks.length === 1 ? 'stock' : 'stocks'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Investment</span>
                    <span className="font-bold text-lg">
                      ₹{sector.totalInvestment.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Present Value</span>
                    <span className="font-bold text-lg">
                      ₹{sector.totalPresentValue.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className={`flex justify-between items-center p-3 rounded-lg ${
                    isPositive ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'
                  }`}>
                    <span className="text-sm font-medium">Gain/Loss</span>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {isPositive ? (
                          <TrendingUp className="w-5 h-5 text-success" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-destructive" />
                        )}
                        <span className={`font-bold text-lg ${isPositive ? 'text-success' : 'text-destructive'}`}>
                          {isPositive ? '+' : ''}₹{Math.abs(sector.totalGainLoss).toLocaleString()}
                        </span>
                      </div>
                      <Badge 
                        variant={isPositive ? "default" : "destructive"}
                        className={`mt-1 ${
                          isPositive 
                            ? 'bg-success/20 text-success hover:bg-success/30 border-success/30' 
                            : 'bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/30'
                        }`}
                      >
                        {isPositive ? '+' : ''}{sector.gainLossPercentage.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Top Holdings:</p>
                  <div className="space-y-1">
                    {sector.stocks.slice(0, 2).map((stock) => (
                      <div key={stock.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate">{stock.symbol}</span>
                        <span className="font-medium">₹{stock.presentValue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
