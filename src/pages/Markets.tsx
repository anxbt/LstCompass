import React from 'react';
import { useTokenData } from '../hooks/useTokenData';
import { TokenCard } from '../components/TokenCard';
import { TokenCardSkeleton } from '../components/LoadingSkeleton';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { useTokenFilters } from '../hooks/useTokenFilters';
import { MarketOverview } from '../components/MarketOverview';

export function Markets() {
  const { tokens, loading, error } = useTokenData();
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTokens,
  } = useTokenFilters(tokens);

  if (loading) {
    return (
      <div>
        <MarketOverview />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Liquid Staking Markets
          </h1>
          <p className="text-gray-600">
            Track and analyze liquid staking tokens across multiple protocols
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar selectedFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TokenCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <MarketOverview />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Liquid Staking Markets
        </h1>
        <p className="text-gray-600">
          Track and analyze liquid staking tokens across multiple protocols
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar selectedFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map(token => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>

      {filteredTokens.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No tokens found matching your criteria</p>
        </div>
      )}
    </div>
  );
}