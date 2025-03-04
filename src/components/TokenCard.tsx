import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Wallet, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { StakingToken } from '../types';

interface TokenCardProps {
  token: StakingToken;
}

export function TokenCard({ token }: TokenCardProps) {
  const [showPlatforms, setShowPlatforms] = useState(false);
  const sortedPlatforms = [...token.platforms].sort((a, b) => a.fee - b.fee);

  // Helper function to handle null/undefined values
  const formatNumber = (value: number | null | undefined, decimals = 2) => {
    if (value == null) return '0';
    return value.toFixed(decimals);
  };

  // Helper function to format large numbers
  const formatCurrency = (value: number | null | undefined) => {
    if (value == null) return '$0';
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  // Helper function to format percentage changes
  const formatPercentage = (value: number | null | undefined) => {
    if (value == null) return '0%';
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <img 
              src={token.image} 
              alt={token.name} 
              className="w-12 h-12 rounded-full bg-gray-50 p-0.5 transform hover:scale-110 transition-transform duration-300"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-900">{token.name}</h3>
                {token.marketCapRank && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                    #{token.marketCapRank}
                  </span>
                )}
              </div>
              <p className="text-gray-500">{token.symbol}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-gray-900">${formatNumber(token.price)}</span>
            {token.priceChangePercentage24h != null && (
              <div className={`flex items-center text-sm ${
                token.priceChangePercentage24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={16} className="mr-1" />
                <span>{formatPercentage(token.priceChangePercentage24h)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">TVL</p>
            <p className="font-semibold text-gray-900">{formatCurrency(token.tvl)}</p>
            <div className="mt-1 text-xs">
              <span className={token.tvlChange1d >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatPercentage(token.tvlChange1d)} (24h)
              </span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Volume (24h)</p>
            <p className="font-semibold text-gray-900">{formatCurrency(token.volume24h)}</p>
            <div className="mt-1 text-xs">
              <span className={token.volumeChange7d >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatPercentage(token.volumeChange7d)} (7d)
              </span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Revenue (24h)</p>
            <p className="font-semibold text-gray-900">{formatCurrency(token.revenue24h)}</p>
            <div className="mt-1 text-xs text-gray-500">
              P/S: {formatNumber(token.priceToSales)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Fees (24h)</p>
            <p className="font-semibold text-gray-900">{formatCurrency(token.fees24h)}</p>
            <div className="mt-1 text-xs text-gray-500">
              P/F: {formatNumber(token.priceToFees)}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowPlatforms(!showPlatforms)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">Compare Staking Platforms</span>
            {showPlatforms ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {showPlatforms && (
            <div className="mt-4 space-y-3">
              {sortedPlatforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className={`p-4 rounded-lg ${
                    index === 0 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{platform.name}</span>
                    {index === 0 && (
                      <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full font-medium">
                        Best Rate
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Fee</p>
                      <p className="font-medium text-gray-900">{platform.fee}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Min Stake</p>
                      <p className="font-medium text-gray-900">${platform.minStake}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">APY</p>
                      <p className="font-medium text-green-600">{platform.apy}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors font-medium">
            <Wallet size={18} className="mr-2" />
            Stake Now
          </button>
          <button className="flex-1 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors font-medium">
            <ArrowUpRight size={18} className="mr-2" />
            Trade
          </button>
        </div>
      </div>
    </div>
  );
}