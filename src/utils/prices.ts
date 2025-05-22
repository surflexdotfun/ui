import { MarketPrices } from "../api/trade";
import { MarketType } from "../types/markets";

export const priceOfMarket = (market: MarketType, prices: MarketPrices) => {
  if (market === "SUI") {
    return prices.SUIUSDT;
  }
  if (market === "BTC") {
    return prices.BTCUSDT;
  }
  if (market === "ETH") {
    return prices.ETHUSDT;
  }
  return 0;
};

export const coinIdToMarket = (coinId: string): MarketType => {
  if (coinId === "SUIUSDT") {
    return "SUI";
  }
  if (coinId === "BTCUSDT") {
    return "BTC";
  }
  if (coinId === "ETHUSDT") {
    return "ETH";
  }
  return "SUI";
}
