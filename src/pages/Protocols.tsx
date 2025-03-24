// import React, { useEffect, useState } from 'react';
// import { ArrowUpRight, TrendingUp, ArrowDown, ArrowUp, Download } from 'lucide-react';
// import { TableRowSkeleton } from '../components/LoadingSkeleton';

// interface Protocol {
//   name: string;
//   symbol: string;
//   tvl: number;
//   tvlPrevDay: number;
//   tvlPrevMonth: number;
//   mcap: number;
//   fees: {
//     '24h': number;
//     '7d': number;
//     '30d': number;
//     monthlyAvg1y: number;
//   };
//   revenue: {
//     '24h': number;
//     '7d': number;
//     '30d': number;
//     '1y': number;
//   };
//   userFees24h: number;
//   cumulativeFees: number;
//   holdersRevenue: {
//     '24h': number;
//     '30d': number;
//   };
//   treasuryRevenue24h: number;
//   supplyRevenue: number;
//   volume: {
//     '24h': number;
//     change7d: number;
//     cumulative: number;
//   };
//   logo: string;
//   category: string;
//   slug: string;
// }

// export function Protocols() {
//   const [protocols, setProtocols] = useState<Protocol[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
//     key: 'tvl',
//     direction: 'desc'
//   });

//   useEffect(() => {
//     const fetchProtocolsData = async () => {
//       try {
//         // Fetch both protocols and fees data
//         const [protocolsResponse, feesResponse] = await Promise.all([
//           fetch('https://api.llama.fi/protocols'),
//           fetch('https://api.llama.fi/overview/fees')
//         ]);

//         if (!protocolsResponse.ok || !feesResponse.ok) {
//           throw new Error('Failed to fetch protocol data');
//         }

//         const protocolsData = await protocolsResponse.json();
//         const feesData = await feesResponse.json();

//         // Create a map of protocol fees data
//         const feesMap = new Map(
//           feesData.protocols.map((p: any) => [p.name.toLowerCase(), p])
//         );

//         // Filter and transform the protocols data
//         const liquidStakingProtocols = protocolsData
//           .filter((p: any) => p.category === 'Liquid Staking')
//           .map((p: any) => {
//             const feesInfo = feesMap.get(p.name.toLowerCase()) || {};
            
//             return {
//               name: p.name,
//               symbol: p.symbol || '',
//               slug: p.slug,
//               tvl: p.tvl || 0,
//               tvlPrevDay: p.tvlPrevDay || 0,
//               tvlPrevMonth: p.tvlPrevMonth || 0,
//               mcap: p.mcap || 0,
//               fees: {
//                 '24h': feesInfo.total24h || 0,
//                 '7d': feesInfo.total7d || 0,
//                 '30d': feesInfo.total30d || 0,
//                 monthlyAvg1y: feesInfo.monthlyAvg1y || 0
//               },
//               revenue: {
//                 '24h': feesInfo.revenue24h || 0,
//                 '7d': feesInfo.revenue7d || 0,
//                 '30d': feesInfo.revenue30d || 0,
//                 '1y': feesInfo.revenue1y || 0
//               },
//               userFees24h: feesInfo.userFees24h || 0,
//               cumulativeFees: feesInfo.cumulativeFees || 0,
//               holdersRevenue: {
//                 '24h': feesInfo.holdersRevenue24h || 0,
//                 '30d': feesInfo.holdersRevenue30d || 0
//               },
//               treasuryRevenue24h: feesInfo.treasuryRevenue24h || 0,
//               supplyRevenue: feesInfo.supplyRevenue || 0,
//               volume: {
//                 '24h': feesInfo.volume24h || 0,
//                 change7d: feesInfo.volumeChange7d || 0,
//                 cumulative: feesInfo.cumulativeVolume || 0
//               },
//               logo: p.logo || '',
//               category: p.category
//             };
//           });

//         setProtocols(liquidStakingProtocols);
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch protocol data');
//         setLoading(false);
//       }
//     };

//     fetchProtocolsData();
//   }, []);

//   const formatNumber = (value: number, type: 'currency' | 'percentage' = 'currency') => {
//     if (type === 'percentage') {
//       return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
//     }
    
//     if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
//     if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
//     if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
//     return `$${value.toFixed(2)}`;
//   };

//   const calculateTvlChange = (current: number, previous: number) => {
//     if (!previous) return 0;
//     return ((current - previous) / previous) * 100;
//   };

//   const sortData = (key: string) => {
//     setSortConfig(prevConfig => ({
//       key,
//       direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
//     }));
//   };

//   const getSortedProtocols = () => {
//     const sorted = [...protocols].sort((a, b) => {
//       let aValue = a[sortConfig.key as keyof Protocol];
//       let bValue = b[sortConfig.key as keyof Protocol];

//       if (typeof aValue === 'object') {
//         // Handle nested objects (e.g., fees.24h)
//         const keys = sortConfig.key.split('.');
//         aValue = keys.reduce((obj, key) => obj[key], a);
//         bValue = keys.reduce((obj, key) => obj[key], b);
//       }

//       if (sortConfig.direction === 'asc') {
//         return aValue > bValue ? 1 : -1;
//       }
//       return aValue < bValue ? 1 : -1;
//     });
//     return sorted;
//   };

//   const exportToCSV = () => {
//     // Create CSV header
//     const headers = [
//       'Protocol',
//       'Symbol',
//       'TVL',
//       'TVL Change (24h)',
//       'Fees (24h)',
//       'Revenue (24h)',
//       'Volume (24h)'
//     ].join(',');

//     // Create CSV rows
//     const rows = getSortedProtocols().map(protocol => {
//       const tvlChange24h = calculateTvlChange(protocol.tvl, protocol.tvlPrevDay);
//       return [
//         `"${protocol.name}"`,
//         `"${protocol.symbol}"`,
//         protocol.tvl,
//         tvlChange24h,
//         protocol.fees['24h'],
//         protocol.revenue['24h'],
//         protocol.volume['24h']
//       ].join(',');
//     });

//     // Combine header and rows
//     const csvContent = [headers, ...rows].join('\n');

//     // Create a blob and download link
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'liquid_staking_protocols.csv');
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (loading) {
//     return (
//       <div className="overflow-x-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Liquid Staking Protocols
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Compare metrics across different liquid staking protocols
//           </p>
//         </div>

//         <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
//           <thead className="bg-gray-50 dark:bg-gray-700">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
//                 Protocol
//               </th>
//               <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//                 TVL
//               </th>
//               <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//                 TVL Change (24h)
//               </th>
//               <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//                 Fees (24h)
//               </th>
//               <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//                 Revenue (24h)
//               </th>
//               <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//                 Volume (24h)
//               </th>
//               <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//             {[...Array(5)].map((_, i) => (
//               <TableRowSkeleton key={i} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Liquid Staking Protocols
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Compare metrics across different liquid staking protocols
//           </p>
//         </div>
//         <button
//           onClick={exportToCSV}
//           className="mt-4 md:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Download size={18} />
//           Export to CSV
//         </button>
//       </div>

//       <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
//         <thead className="bg-gray-50 dark:bg-gray-700">
//           <tr>
//             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
//               Protocol
//             </th>
//             <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
//                 onClick={() => sortData('tvl')}>
//               <div className="flex items-center justify-end gap-2">
//                 TVL
//                 {sortConfig.key === 'tvl' && (
//                   sortConfig.direction === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
//                 )}
//               </div>
//             </th>
//             <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//               TVL Change (24h)
//             </th>
//             <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
//                 onClick={() => sortData('fees.24h')}>
//               <div className="flex items-center justify-end gap-2">
//                 Fees (24h)
//                 {sortConfig.key === 'fees.24h' && (
//                   sortConfig.direction === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
//                 )}
//               </div>
//             </th>
//             <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
//                 onClick={() => sortData('revenue.24h')}>
//               <div className="flex items-center justify-end gap-2">
//                 Revenue (24h)
//                 {sortConfig.key === 'revenue.24h' && (
//                   sortConfig.direction === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />
//                 )}
//               </div>
//             </th>
//             <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//               Volume (24h)
//             </th>
//             <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//           {getSortedProtocols().map((protocol) => {
//             const tvlChange24h = calculateTvlChange(protocol.tvl, protocol.tvlPrevDay);
            
//             return (
//               <tr key={protocol.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={protocol.logo}
//                       alt={protocol.name}
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <div>
//                       <div className="font-medium text-gray-900 dark:text-white">{protocol.name}</div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">{protocol.symbol}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
//                   {formatNumber(protocol.tvl)}
//                 </td>
//                 <td className={`px-6 py-4 text-right font-medium ${
//                   tvlChange24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
//                 }`}>
//                   {formatNumber(tvlChange24h, 'percentage')}
//                 </td>
//                 <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
//                   {formatNumber(protocol.fees['24h'])}
//                 </td>
//                 <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
//                   {formatNumber(protocol.revenue['24h'])}
//                 </td>
//                 <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
//                   {formatNumber(protocol.volume['24h'])}
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                     <ArrowUpRight size={16} className="mr-1" />
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Download } from 'lucide-react';
import { TableRowSkeleton } from '../components/LoadingSkeleton';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState
} from "@tanstack/react-table";
import { set } from '@project-serum/anchor/dist/cjs/utils/features';

interface Protocol {
  name: string;
  symbol: string;
  tvl: number;
  tvlPrevDay: number;
  tvlPrevMonth: number;
  mcap: number;
  fees: {
    '24h': number;
    '7d': number;
    '30d': number;
    monthlyAvg1y: number;
  };
  revenue: {
    '24h': number;
    '7d': number;
    '30d': number;
    '1y': number;
  };
  userFees24h: number;
  cumulativeFees: number;
  holdersRevenue: {
    '24h': number;
    '30d': number;
  };
  treasuryRevenue24h: number;
  supplyRevenue: number;
  volume: {
    '24h': number;
    change7d: number;
    cumulative: number;
  };
  logo: string;
  category: string;
  slug: string;
}


export function Protocols() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'tvl', desc: true }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchProtocolsData = async () => {
      try {
        // Fetch both protocols and fees data
        const [protocolsResponse, feesResponse] = await Promise.all([
          fetch('https://api.llama.fi/protocols'),
          fetch('https://api.llama.fi/overview/fees')
        ]);

        if (!protocolsResponse.ok || !feesResponse.ok) {
          throw new Error('Failed to fetch protocol data');
        }

        const protocolsData = await protocolsResponse.json();
        const feesData = await feesResponse.json();

        // Create a map of protocol fees data
        const feesMap = new Map(
          feesData.protocols.map((p: any) => [p.name.toLowerCase(), p])
        );

        // Filter and transform the protocols data
        const liquidStakingProtocols = protocolsData
          .filter((p: any) => p.category === 'Liquid Staking')
          .map((p: any) => {
            const feesInfo = feesMap.get(p.name.toLowerCase()) || {};
            
            return {
              name: p.name,
              symbol: p.symbol || '',
              slug: p.slug,
              tvl: p.tvl || 0,
              tvlPrevDay: p.tvlPrevDay || 0,
              tvlPrevMonth: p.tvlPrevMonth || 0,
              mcap: p.mcap || 0,
              fees: {
                '24h': feesInfo.total24h || 0,
                '7d': feesInfo.total7d || 0,
                '30d': feesInfo.total30d || 0,
                monthlyAvg1y: feesInfo.monthlyAvg1y || 0
              },
              revenue: {
                '24h': feesInfo.revenue24h || 0,
                '7d': feesInfo.revenue7d || 0,
                '30d': feesInfo.revenue30d || 0,
                '1y': feesInfo.revenue1y || 0
              },
              userFees24h: feesInfo.userFees24h || 0,
              cumulativeFees: feesInfo.cumulativeFees || 0,
              holdersRevenue: {
                '24h': feesInfo.holdersRevenue24h || 0,
                '30d': feesInfo.holdersRevenue30d || 0
              },
              treasuryRevenue24h: feesInfo.treasuryRevenue24h || 0,
              supplyRevenue: feesInfo.supplyRevenue || 0,
              volume: {
                '24h': feesInfo.volume24h || 0,
                change7d: feesInfo.volumeChange7d || 0,
                cumulative: feesInfo.cumulativeVolume || 0
              },
              logo: p.logo || '',
              category: p.category
            };
          });

        setProtocols(liquidStakingProtocols);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch protocol data');
        setLoading(false);
      }
    };

    fetchProtocolsData();
  }, []);


const handleViewDetails = () => {

  console.log("hy");
  setIsModalOpen(true);
};

  const formatNumber = (value: number, type: 'currency' | 'percentage' = 'currency') => {
    if (type === 'percentage') {
      return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
    }
    
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const calculateTvlChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const exportToCSV = () => {
    // Create CSV header
    const headers = [
      'Protocol',
      'Symbol',
      'TVL',
      'TVL Change (24h)',
      'Fees (24h)',
      'Revenue (24h)',
      'Volume (24h)'
    ].join(',');

    // Create CSV rows
    const rows = protocols.map(protocol => {
      const tvlChange24h = calculateTvlChange(protocol.tvl, protocol.tvlPrevDay);
      return [
        `"${protocol.name}"`,
        `"${protocol.symbol}"`,
        protocol.tvl,
        tvlChange24h,
        protocol.fees['24h'],
        protocol.revenue['24h'],
        protocol.volume['24h']
      ].join(',');
    });

    // Combine header and rows
    const csvContent = [headers, ...rows].join('\n');

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'liquid_staking_protocols.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Define columns using columnHelper
  const columnHelper = createColumnHelper<Protocol>();
  
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Protocol',
      cell: info => (
        <div className="flex items-center gap-3">
          <img
            src={info.row.original.logo}
            alt={info.getValue()}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
            }}
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{info.getValue()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{info.row.original.symbol}</div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('tvl', {
      header: () => (
        <div className="flex items-center justify-end">TVL</div>
      ),
      cell: info => (
        <div className="text-right font-medium text-gray-900 dark:text-white">
          {formatNumber(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor(row => calculateTvlChange(row.tvl, row.tvlPrevDay), {
      id: 'tvlChange',
      header: () => (
        <div className="flex items-center justify-end">TVL Change (24h)</div>
      ),
      cell: info => {
        const value = info.getValue();
        return (
          <div className={`text-right font-medium ${
            value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {formatNumber(value, 'percentage')}
          </div>
        );
      },
    }),
    columnHelper.accessor(row => row.fees['24h'], {
      id: 'fees24h',
      header: () => (
        <div className="flex items-center justify-end">Fees (24h)</div>
      ),
      cell: info => (
        <div className="text-right font-medium text-gray-900 dark:text-white">
          {formatNumber(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor(row => row.revenue['24h'], {
      id: 'revenue24h',
      header: () => (
        <div className="flex items-center justify-end">Revenue (24h)</div>
      ),
      cell: info => (
        <div className="text-right font-medium text-gray-900 dark:text-white">
          {formatNumber(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor(row => row.volume['24h'], {
      id: 'volume24h',
      header: () => (
        <div className="flex items-center justify-end">Volume (24h)</div>
      ),
      cell: info => (
        <div className="text-right font-medium text-gray-900 dark:text-white">
          {formatNumber(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('name', {
      id: 'actions',
      header: () => (
        <div className="flex items-center justify-end">Actions</div>
      ),
      cell: info => (
        <div className="text-right">
          <button onClick={() => handleViewDetails()}
           className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ArrowUpRight size={16} className="mr-1" />
            View Details
          </button>
        </div>
      ),
      enableSorting: false
    }),
  ], []);

  // Create table instance
  const table = useReactTable({
    data: protocols,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading state
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Liquid Staking Protocols
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compare metrics across different liquid staking protocols
          </p>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Protocol
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                TVL
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                TVL Change (24h)
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                Fees (24h)
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                Revenue (24h)
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                Volume (24h)
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(5)].map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }



  // {isModalOpen && (
  //   <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
  //     <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
  //       <div className="flex justify-between items-center mb-4">
  //         <h2 className="text-xl font-bold">Protocol Details</h2>
  //         <button 
  //           onClick={() => setIsModalOpen(false)}
  //           className="text-gray-500 hover:text-gray-700"
  //         >
  //           &times;
  //         </button>
  //       </div>
  //       <p>Modal content goes here</p>
  //     </div>
  //   </div>
  // )}

  // Render with data
  return (
    <div className="overflow-x-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Liquid Staking Protocols
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compare metrics across different liquid staking protocols
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white"
                    style={{ 
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                      textAlign: header.id.includes('name') || header.id.includes('actions') ? 'left' : 'right'
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className={`flex items-center ${
                      header.id.includes('name') ? 'justify-start' : 'justify-end'
                    } gap-2`}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === 'desc' ? 
                              <ArrowDown size={16} /> : 
                              <ArrowUp size={16} />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No protocols found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>




  );
}