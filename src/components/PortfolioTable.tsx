import { Stock } from "@/types/stock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StockBadge } from "./StockBadge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioTableProps {
  stocks: Stock[];
}

export const PortfolioTable = ({ stocks }: PortfolioTableProps) => {
  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-2xl">Your Holdings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-4 font-semibold text-sm">Stock Details</th>
                <th className="text-right p-4 font-semibold text-sm">Purchase</th>
                <th className="text-right p-4 font-semibold text-sm">Quantity</th>
                <th className="text-right p-4 font-semibold text-sm">Investment</th>
                <th className="text-right p-4 font-semibold text-sm">Portfolio %</th>
                <th className="text-center p-4 font-semibold text-sm">Exchange</th>
                <th className="text-right p-4 font-semibold text-sm">Current Price</th>
                <th className="text-right p-4 font-semibold text-sm">Present Value</th>
                <th className="text-right p-4 font-semibold text-sm">P/L</th>
                <th className="text-right p-4 font-semibold text-sm">P/E</th>
                <th className="text-left p-4 font-semibold text-sm">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => {
                const isPositive = stock.gainLoss >= 0;
                return (
                  <tr
                    key={stock.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                          isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                        }`}>
                          {stock.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-base">{stock.name}</p>
                          <p className="text-xs text-muted-foreground">{stock.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right p-4 text-muted-foreground">
                      ₹{stock.purchasePrice.toLocaleString()}
                    </td>
                    <td className="text-right p-4">
                      <Badge variant="outline" className="font-mono">
                        {stock.quantity}
                      </Badge>
                    </td>
                    <td className="text-right p-4 font-medium">
                      ₹{stock.investment.toLocaleString()}
                    </td>
                    <td className="text-right p-4">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full"
                            style={{ width: `${Math.min(stock.portfolioPercentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-12">
                          {stock.portfolioPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <Badge variant="secondary" className="font-medium">
                        {stock.exchange}
                      </Badge>
                    </td>
                    <td className="text-right p-4 font-semibold text-lg">
                      ₹{stock.cmp.toLocaleString()}
                    </td>
                    <td className="text-right p-4 font-bold">
                      ₹{stock.presentValue.toLocaleString()}
                    </td>
                    <td className="text-right p-4">
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          {isPositive ? (
                            <TrendingUp className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          )}
                          <span className={`font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                            {isPositive ? '+' : ''}₹{Math.abs(stock.gainLoss).toLocaleString()}
                          </span>
                        </div>
                        <StockBadge 
                          gainLoss={stock.gainLoss}
                          gainLossPercentage={stock.gainLossPercentage}
                        />
                      </div>
                    </td>
                    <td className="text-right p-4">
                      <Badge variant="outline" className="font-mono">
                        {stock.peRatio}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-muted-foreground max-w-[200px]">
                        {stock.latestEarnings}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
