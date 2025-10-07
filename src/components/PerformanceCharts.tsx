import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stock } from "@/types/stock";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface PerformanceChartsProps {
  stocks: Stock[];
}

export const PerformanceCharts = ({ stocks }: PerformanceChartsProps) => {
  const topGainers = [...stocks]
    .filter(s => s.gainLoss > 0)
    .sort((a, b) => b.gainLossPercentage - a.gainLossPercentage)
    .slice(0, 5);

  const topLosers = [...stocks]
    .filter(s => s.gainLoss < 0)
    .sort((a, b) => a.gainLossPercentage - b.gainLossPercentage)
    .slice(0, 5);

  return (
    <Card className="bg-gradient-card border-border shadow-card mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-accent" />
          <CardTitle className="text-2xl">Performance Overview</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="gainers" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Top Losers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gainers" className="space-y-3">
            {topGainers.length > 0 ? (
              topGainers.map((stock, index) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg hover:bg-success/10 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{stock.name}</p>
                      <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success text-lg">
                      +{stock.gainLossPercentage.toFixed(2)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +₹{stock.gainLoss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No gainers yet</p>
            )}
          </TabsContent>

          <TabsContent value="losers" className="space-y-3">
            {topLosers.length > 0 ? (
              topLosers.map((stock, index) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-4 bg-destructive/5 border border-destructive/20 rounded-lg hover:bg-destructive/10 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{stock.name}</p>
                      <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-destructive text-lg">
                      {stock.gainLossPercentage.toFixed(2)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{stock.gainLoss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No losers yet</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
