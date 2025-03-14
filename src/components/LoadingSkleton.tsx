export function TokenCardSkeleton() {
    return (
      <div className="bg-white rounded-xl shadow-lg animate-pulse">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-24 bg-gray-200 rounded mb-1" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="h-12 flex-1 bg-gray-200 rounded-lg" />
            <div className="h-12 flex-1 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  export function TableRowSkeleton() {
    return (
      <tr className="animate-pulse">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </td>
        <td className="px-6 py-4">
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </td>
        <td className="px-6 py-4">
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </td>
        <td className="px-6 py-4">
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </td>
        <td className="px-6 py-4">
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </td>
        <td className="px-6 py-4">
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </td>
      </tr>
    );
  }