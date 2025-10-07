import { useState, useEffect } from "react";
import { Stock } from "@/types/stock";
import { mockStocks, getUpdatedPrice } from "@/data/mockData";
import { calculatePortfolioTotals, groupBySector, updateStockPrice } from "@/utils/portfolioCalculations";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { SectorSummary } from "@/components/SectorSummary";
import { PortfolioTable } from "@/components/PortfolioTable";
import { PerformanceCharts } from "@/components/PerformanceCharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock } from "lucide-react";

const Index = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    const updatePrices = () => {
      setIsUpdating(true);
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const newCmp = getUpdatedPrice(stock.cmp);
          return updateStockPrice(stock, newCmp);
        })
      );
      setLastUpdate(new Date());
      setTimeout(() => setIsUpdating(false), 500);
    };

    const interval = setInterval(updatePrices, 15000);
    return () => clearInterval(interval);
  }, []);

  const portfolioTotals = calculatePortfolioTotals(stocks);
  const sectors = groupBySector(stocks);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div>
                <h1 className="text-xl font-bold">Portfolio Analytics</h1>
                <p className="text-xs text-muted-foreground">Professional Dashboard</p>
              </div>
            </div>
            
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="text-muted-foreground text-xs">Last Update</p>
                    <p className="font-mono font-medium">{lastUpdate.toLocaleTimeString()}</p>
                  </div>
                  <Badge 
                    variant={isUpdating ? "default" : "secondary"}
                    className={`${isUpdating ? 'bg-success text-success-foreground' : ''}`}
                  >
                    <RefreshCw className={`w-3 h-3 mr-1 ${isUpdating ? 'animate-spin' : ''}`} />
                    {isUpdating ? 'Updating' : 'Live'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
        <PortfolioHeader {...portfolioTotals} />
        
        <PerformanceCharts stocks={stocks} />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">All Holdings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed view of your {stocks.length} investments
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              Auto-refreshes every 15s
            </Badge>
          </div>
          <PortfolioTable stocks={stocks} />
        </div>

        <SectorSummary sectors={sectors} />

        {/* Footer */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Portfolio Dashboard - Real-time stock tracking and comprehensive analysis
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Data updates automatically • {stocks.length} stocks tracked • {sectors.length} sectors monitored
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
