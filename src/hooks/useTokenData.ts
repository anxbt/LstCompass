import { useQuery } from '@tanstack/react-query';
import { CoinGeckoToken, StakingToken } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=liquid-staking-tokens&order=market_cap_desc';
const DEFI_LLAMA_API = 'https://api.llama.fi/protocols';

// Mock platform data since it's not available in the API
const mockPlatforms = {
  'staked-ether': [
    { name: 'Lido', fee: 0.1, minStake: 0.01, apy: 4.5 },
    { name: 'Coinbase', fee: 0.25, minStake: 0.1, apy: 4.3 },
    { name: 'Binance', fee: 0.15, minStake: 0.05, apy: 4.4 }
  ],
  'rocket-pool-eth': [
    { name: 'RocketPool', fee: 0.15, minStake: 0.01, apy: 4.8 },
    { name: 'Binance', fee: 0.2, minStake: 0.1, apy: 4.6 }
  ]
};

async function fetchTokenData() {
  const [cgResponse, llamaResponse] = await Promise.all([
    fetch(COINGECKO_API),
    fetch(DEFI_LLAMA_API)
  ]);

  if (!cgResponse.ok || !llamaResponse.ok) {
    throw new Error('Failed to fetch token data');
  }

  const cgData: CoinGeckoToken[] = await cgResponse.json();
  const llamaData = await llamaResponse.json();

  const liquidStakingProtocols = llamaData.filter(
    (protocol: any) => protocol.category === 'Liquid Staking'
  );

  const protocolMap = new Map(
    liquidStakingProtocols.map((p: any) => [p.symbol.toLowerCase(), p])
  );

  return cgData.map(token => {
    const llamaProtocol = protocolMap.get(token.symbol.toLowerCase());

    const annualizedRevenue = (llamaProtocol?.revenue24h || 0) * 365;
    const priceToSales = annualizedRevenue > 0 
      ? token.market_cap / annualizedRevenue 
      : 0;

    const annualizedFees = (llamaProtocol?.fees24h || 0) * 365;
    const priceToFees = annualizedFees > 0 
      ? token.market_cap / annualizedFees 
      : 0;


    return {
      id: token.id,
      name: token.name,
      symbol: token.symbol.toUpperCase(),
      price: token.current_price,
      marketCap: token.market_cap,
      volume24h: token.total_volume,
      tvl: llamaProtocol?.tvl || 0,
      tvlChange1d: llamaProtocol?.tvlChange1d || 0,
      tvlChange1m: llamaProtocol?.tvlChange1m || 0,
      mcapTvl: llamaProtocol?.mcapTvl || 0,
      fees24h: llamaProtocol?.fees24h || 0,
      fees7d: llamaProtocol?.fees7d || 0,
      fees30d: llamaProtocol?.fees30d || 0,
      monthlyAvg1yFees: llamaProtocol?.monthlyAvg1yFees || 0,
      revenue24h: llamaProtocol?.revenue24h || 0,
      revenue7d: llamaProtocol?.revenue7d || 0,
      revenue30d: llamaProtocol?.revenue30d || 0,
      revenue1y: llamaProtocol?.revenue1y || 0,
      userFees24h: llamaProtocol?.userFees24h || 0,
      cumulativeFees: llamaProtocol?.cumulativeFees || 0,
      holdersRevenue24h: llamaProtocol?.holdersRevenue24h || 0,
      holdersRevenue30d: llamaProtocol?.holdersRevenue30d || 0,
      treasuryRevenue24h: llamaProtocol?.treasuryRevenue24h || 0,
      supplyRevenue: llamaProtocol?.supplyRevenue || 0,
      priceToSales,
      priceToFees,
      volumeChange7d: llamaProtocol?.volumeChange7d || 0,
      cumulativeVolume: llamaProtocol?.cumulativeVolume || 0,
      apy: 4.5,
      ratio: 1,
      platforms: mockPlatforms[token.id] || [],
      image: token.image,
      priceChange24h: token.price_change_24h,
      priceChangePercentage24h: token.price_change_percentage_24h,
      marketCapRank: token.market_cap_rank,
      high24h: token.high_24h,
      low24h: token.low_24h,
      ath: token.ath,
      athChangePercentage: token.ath_change_percentage,
      athDate: token.ath_date,
      atl: token.atl,
      atlChangePercentage: token.atl_change_percentage,
      atlDate: token.atl_date,
    };
  });
}

export function useTokenData() {
  const { data: tokens = [], isLoading, error } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokenData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { tokens, loading: isLoading, error: error?.message ?? null };
}