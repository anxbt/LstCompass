export interface IDefiLlamaToken {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  tvl: number;
  tvlChange1d: number;
  tvlChange1m: number;
  mcapTvl: number;
  fees24h: number;
  fees7d: number;
  fees30d: number;
  monthlyAvg1yFees: number;
  revenue24h: number;
  revenue7d: number;
  revenue30d: number;
  revenue1y: number;
  userFees24h: number;
  cumulativeFees: number;
  holdersRevenue24h: number;
  holdersRevenue30d: number;
  treasuryRevenue24h: number;
  supplyRevenue: number;
  priceToSales: number;
  priceToFees: number;
  volume24h: number;
  volumeChange7d: number;
  cumulativeVolume: number;
  apy: number;
  ratio: number;
  platforms: StakingPlatform[];
  // CoinGecko fields
  image: string;
  priceChange24h: number | null;
  priceChangePercentage24h: number | null;
  marketCapRank: number | null;
  high24h: number | null;
  low24h: number | null;
  ath: number | null;
  athChangePercentage: number | null;
  athDate: string | null;
  atl: number | null;
  atlChangePercentage: number | null;
  atlDate: string | null;
}

export interface StakingPlatform {
  name: string;
  fee: number;
  minStake: number;
  apy: number;
}

export interface ICoinGeckoToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number | null;
  total_volume: number;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
}