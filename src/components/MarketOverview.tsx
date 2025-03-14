import { useChains } from "../services/chains"
import { useEffect, useState } from "react";
import { formatNumber } from "../utils/formatNumber";
import { TokenCardSkeleton } from "./LoadingSkeleton";

export function MarketOverview() {
    const { chains, isLoading, error } = useChains();

    const TotalTvl = chains?.reduce((acc, chain) => acc + chain.tvl, 0) || 0;


    if (isLoading) {
        return <TokenCardSkeleton/>;
    }

    if (error) {
        return (
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Market Overview
                </h2>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">Error loading market data: {error.message}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Market Overview
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
                {/* first card */}
                <div className="bg-white  dark:bg-gray-800 rounded-lg p-4 shadow-md border-gray-400 border">
                    <div className="mb-2">
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">🔐 Total Value Locked</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{formatNumber(TotalTvl)}</p>

                </div>
                {/* 2nd card */}

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-gray-400 border ">
                    <div className="mb-2">
                        <span>  🌐 Top chains by TVL</span>
                    </div>
                    <div className="gap-2 text-gray-600 dark:text-gray-400 mb-2">
                        {isLoading ? (
                            <p>Loading chains...</p>
                        ) : error ? (
                            <p>Error: {error.message}</p>
                        ) : chains ? (
                            <div className="space-y-2">
                                {chains.map((chain) => (
                                    // <li key={chain.chainId} className="text-gray-800 dark:text-gray-200">
                                    //     {chain.name} {chain.tvl}
                                    // </li>
                                    <div key={chain.name} className="flex justify-between ">
                                        <div className="gap-4">
                                            {chain.name}
                                        </div>
                                        <span className="text-gray-900 dark:text-white">{formatNumber(chain.tvl)}</span>

                                    </div>
                                ))}

                            </div>
                        ) : null}
                    </div>
                </div>
                {/* 3rd card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-gray-400 border">
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        <span>🔐 Total Value Locked</span>
                    </div>

                    <div className="space-y-3">
                        {chains?.map((chain) => {
                            const percentage = (chain.tvl / TotalTvl) * 100;
                            return (
                                <div key={chain.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-800 dark:text-gray-200">{chain.name}</span>
                                        <span className="text-gray-800 dark:text-gray-200">{percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2  bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}