const LLAMA_API_BASE = 'https://api.llama.fi';

export interface StablecoinData {
  circulating: number;
  chains: { [chain: string]: number };
  price: number;
  timestamp: number;
}

export interface ChainStablecoinData {
  [chain: string]: {
    totalCirculating: number;
    stablecoins: {
      [symbol: string]: number;
    };
  };
}

export interface StablecoinPrice {
  symbol: string;
  price: number;
  timestamp: number;
}

export const defiLlamaApi = {
  async getStablecoinHistory(asset: string): Promise<StablecoinData[]> {
    const response = await fetch(`${LLAMA_API_BASE}/stablecoin/${asset}`);
    return response.json();
  },

  async getStablecoinChains(): Promise<ChainStablecoinData> {
    const response = await fetch(`${LLAMA_API_BASE}/stablecoinchains`);
    return response.json();
  },

  async getStablecoinPrices(): Promise<StablecoinPrice[]> {
    const response = await fetch(`${LLAMA_API_BASE}/stablecoinprices`);
    return response.json();
  }
};