import { Stock, SectorSummary } from "@/types/stock";

export const calculatePortfolioTotals = (stocks: Stock[]) => {
  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const gainLossPercentage = (totalGainLoss / totalInvestment) * 100;

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    gainLossPercentage,
  };
};

export const groupBySector = (stocks: Stock[]): SectorSummary[] => {
  const sectorMap = new Map<string, Stock[]>();

  stocks.forEach((stock) => {
    if (!sectorMap.has(stock.sector)) {
      sectorMap.set(stock.sector, []);
    }
    sectorMap.get(stock.sector)!.push(stock);
  });

  const sectors: SectorSummary[] = [];

  sectorMap.forEach((stocks, sector) => {
    const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const gainLossPercentage = (totalGainLoss / totalInvestment) * 100;

    sectors.push({
      sector,
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      gainLossPercentage,
      stocks,
    });
  });

  return sectors.sort((a, b) => b.totalPresentValue - a.totalPresentValue);
};

export const updateStockPrice = (stock: Stock, newCmp: number): Stock => {
  const presentValue = newCmp * stock.quantity;
  const gainLoss = presentValue - stock.investment;
  const gainLossPercentage = (gainLoss / stock.investment) * 100;

  return {
    ...stock,
    cmp: newCmp,
    presentValue,
    gainLoss,
    gainLossPercentage,
  };
};
