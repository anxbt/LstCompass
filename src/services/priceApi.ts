const LLAMA_API_BASE = 'https://coins.llama.fi';

export interface PriceResponse {
  coins: {
    [key: string]: {
      price: number;
      timestamp: number;
    };
  };
}

export interface ChartDataPoint {
  price: number;
  timestamp: number;
}

export interface ChartResponse {
  coins: {
    [key: string]: ChartDataPoint[];
  };
}

export interface PercentageResponse {
  coins: {
    [key: string]: {
      price: number;
      timestamp: number;
      delta: number;
    };
  };
}

export const priceApi = {
  async getCurrentPrices(addresses: string[]): Promise<PriceResponse> {
    const response = await fetch(`${LLAMA_API_BASE}/prices/current/${addresses.join(',')}`);
    return response.json();
  },

  async getHistoricalPrices(timestamp: number, addresses: string[]): Promise<PriceResponse> {
    const response = await fetch(`${LLAMA_API_BASE}/prices/historical/${timestamp}/${addresses.join(',')}`);
    return response.json();
  },

  async getPriceChart(addresses: string[]): Promise<ChartResponse> {
    const response = await fetch(`${LLAMA_API_BASE}/chart/${addresses.join(',')}`);
    return response.json();
  },

  async getPricePercentageChange(addresses: string[]): Promise<PercentageResponse> {
    const response = await fetch(`${LLAMA_API_BASE}/percentage/${addresses.join(',')}`);
    return response.json();
  },

  async getFirstPrice(addresses: string[]): Promise<PriceResponse> {
    const response = await fetch(`${LLAMA_API_BASE}/prices/first/${addresses.join(',')}`);
    return response.json();
  },

  async getBlockByTimestamp(chain: string, timestamp: number): Promise<{ height: number }> {
    const response = await fetch(`${LLAMA_API_BASE}/block/${chain}/${timestamp}`);
    return response.json();
  }
};