import { useQuery } from '@tanstack/react-query';
import { priceApi } from '../services/priceApi';

export function useCurrentPrices(addresses: string[]) {
  return useQuery({
    queryKey: ['prices', 'current', addresses],
    queryFn: () => priceApi.getCurrentPrices(addresses),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useHistoricalPrices(timestamp: number, addresses: string[]) {
  return useQuery({
    queryKey: ['prices', 'historical', timestamp, addresses],
    queryFn: () => priceApi.getHistoricalPrices(timestamp, addresses),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePriceChart(addresses: string[]) {
  return useQuery({
    queryKey: ['prices', 'chart', addresses],
    queryFn: () => priceApi.getPriceChart(addresses),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePricePercentageChange(addresses: string[]) {
  return useQuery({
    queryKey: ['prices', 'percentage', addresses],
    queryFn: () => priceApi.getPricePercentageChange(addresses),
    staleTime: 1000 * 60,
  });
}