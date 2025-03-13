import { useQuery } from "@tanstack/react-query";

interface IChain{
    gecok_id: string;
    tvl: number;
    tokenSymbol: string;
    cmcId: string;
    name: string;
    chainId: number;
}

const DEFI_LLAMA_CHAINS_API = 'https://api.llama.fi/chains';

export async function fetchChainsData(): Promise<IChain[]> {
    const response = await fetch(DEFI_LLAMA_CHAINS_API);
    const data= await response.json();
    console.log(data);
    const sortedChains: IChain[] = data.sort((a: IChain, b: IChain) => b.tvl - a.tvl);
    console.log("sorted china"+sortedChains);
    const topChains: IChain[] = sortedChains.slice(0, 5);
    console.log("topChains"+topChains
    );
    return topChains;

}

export function useChains() {
    const { data: chains, isLoading, error } = useQuery<IChain[], Error>({
      queryKey: ['chains'],
      queryFn: fetchChainsData,
    });
  
    if (isLoading) {
      console.log('Loading chains...');
    }
  
    if (error) {
      console.error('Error fetching chains:', error);
    }
  
    if (chains) {
      console.log('Chains data:', chains);
    }
  
    return {
      chains,
      isLoading,
      error,
    };
  }