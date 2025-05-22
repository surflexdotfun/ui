export type MarketType = "SUI" | "BTC" | "ETH";

export const marketToCoinId = {
  SUI: "suiusdt",
  BTC: "btcusdt",
  ETH: "ethusdt",
};

export type Market = {
  id: string;
  type: MarketType;
  name: string;
  price: number;
  change: number;
}
