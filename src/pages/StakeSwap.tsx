import React, { useState } from 'react';
import { ArrowDown, Wallet, ArrowRightLeft } from 'lucide-react';

export function StakeSwap() {
  const [activeTab, setActiveTab] = useState<'stake' | 'swap'>('stake');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('SOL');
  const [receiveToken, setReceiveToken] = useState('USDC');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{
    success?: boolean;
    txid?: string;
    error?: any;
  } | null>(null);

  const tokens = {
    "SOL": { mint: "So11111111111111111111111111111111111111112", decimals: 9 },
    "USDC": { mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", decimals: 6 },
    "BONK": { mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", decimals: 5 },
    "RAY": { mint: "AYbeJ2Zg7VWEZR2196P9qY9ynCxrPjaZKsDkhDCMJSUm", decimals: 6 }
  };

  const handleSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      const inputToken = tokens[selectedToken as keyof typeof tokens];
      const outputToken = tokens[receiveToken as keyof typeof tokens];
      
      // Convert amount to smallest denomination based on token decimals
      const amountInSmallestUnit = parseFloat(amount) * Math.pow(10, inputToken.decimals);
      
      // Use a dummy wallet address for now, in production this would be the user's wallet
      const walletAddress = "8CPbBrFF4GqAmK7CxonbiJ29NtqWgtcZk32hVxcijiyf";
      
      const result = await performSwap(
        inputToken.mint,
        outputToken.mint,
        Math.round(amountInSmallestUnit),
        walletAddress
      );
      
      setTransactionResult(result);
      if (result.success) {
        alert(`Swap successful! Transaction ID: ${result.txid}`);
      } else {
        alert(`Swap failed! Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during swap:", error);
      setTransactionResult({ success: false, error });
      alert(`Swap failed! Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // When the selected token changes, update the receive token to prevent selecting the same token
  const handleSelectedTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedToken = e.target.value;
    setSelectedToken(newSelectedToken);
    
    if (newSelectedToken === receiveToken) {
      // Find the first token that's not the newly selected token
      const firstDifferentToken = Object.keys(tokens).find(token => token !== newSelectedToken);
      if (firstDifferentToken) {
        setReceiveToken(firstDifferentToken);
      }
    }
  };




  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Stake & Swap
        </h1>
        <p className="text-gray-600">
          Stake your ETH or swap between liquid staking tokens
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('stake')}
            className={`flex-1 px-6 py-4 text-sm font-medium ${
              activeTab === 'stake'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Wallet className="w-4 h-4 inline-block mr-2" />
            Stake
          </button>
          <button
            onClick={() => setActiveTab('swap')}
            className={`flex-1 px-6 py-4 text-sm font-medium ${
              activeTab === 'swap'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4 inline-block mr-2" />
            Swap
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {activeTab === 'stake' ? 'Amount to Stake' : 'You Pay'}
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(tokens)
                  .filter(([symbol]) => activeTab === 'stake' ? symbol === 'ETH' : true)
                  .map(([symbol, token]) => (
                    <option key={symbol} value={symbol}>
                      {symbol}
                    </option>
                  ))}
              </select>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Balance: {tokens[selectedToken as keyof typeof tokens].balance || '0'} {selectedToken}
            </p>
          </div>

          <div className="flex justify-center my-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <ArrowDown className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {activeTab === 'stake' ? 'You Receive' : 'You Receive'}
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={amount}
                disabled
                className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
              <select
                value={receiveToken}
                onChange={(e) => setReceiveToken(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(tokens)
                  .filter(([symbol]) => {
                    if (activeTab === 'stake') {
                      return symbol !== 'ETH';
                    }
                    return symbol !== selectedToken;
                  })
                  .map(([symbol, token]) => (
                    <option key={symbol} value={symbol}>
                      {symbol}
                    </option>
                  ))}
              </select>
            </div>
            {tokens[receiveToken as keyof typeof tokens].apy && (
              <p className="text-sm text-green-600 mt-2">
                Earn {tokens[receiveToken as keyof typeof tokens].apy}% APY
              </p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Transaction Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Exchange Rate</span>
                <span>1 {selectedToken} = 1 {receiveToken}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Network Fee</span>
                <span>≈ $2.50</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Protocol Fee</span>
                <span>0.1%</span>
              </div>
              {activeTab === 'stake' && (
                <div className="flex justify-between text-gray-600">
                  <span>Staking APY</span>
                  <span className="text-green-600">{tokens[receiveToken as keyof typeof tokens].apy}%</span>
                </div>
              )}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Connect Wallet to Continue
          </button>
        </div>
      </div>
    </div>
  );
}