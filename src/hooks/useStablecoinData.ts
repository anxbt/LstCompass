import { useQuery } from '@tanstack/react-query';
import { defiLlamaApi } from '../services/defiLlamaApi';

export function useStablecoinHistory(asset: string) {
  return useQuery({
    queryKey: ['stablecoin', 'history', asset],
    queryFn: () => defiLlamaApi.getStablecoinHistory(asset),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useStablecoinChains() {
  return useQuery({
    queryKey: ['stablecoin', 'chains'],
    queryFn: defiLlamaApi.getStablecoinChains,
    staleTime: 1000 * 60 * 5,
  });
}

export function useStablecoinPrices() {
  return useQuery({
    queryKey: ['stablecoin', 'prices'],
    queryFn: defiLlamaApi.getStablecoinPrices,
    staleTime: 1000 * 60 * 5,
  });
}