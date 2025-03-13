import React ,{ useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link ,useLocation} from 'react-router-dom';
import { Coins, LayoutGrid, ArrowRightLeft, Sun, Moon, Book } from 'lucide-react';
import { Markets } from './pages/Markets';
import { Protocols } from './pages/Protocols';
import { StakeSwap } from './pages/StakeSwap';
import { Documentation } from './pages/Documentation';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Footer } from './components/Footer';
import { logPageView,initGA } from './services/analyticsService';
import { useChains } from './services/chains';
import { MarketOverview } from './components/MarketOverview';

// Google Analytics tracking component
// function GATracker() {
//   const location = useLocation();
  
//   useEffect(() => {
//     logPageView();
//   }, [location]);
  
//   return null;
// }


function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { chains} = useChains();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                LstCompass
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Coins className="h-5 w-5 mr-2" />
                Markets
              </Link>
              <Link
                to="/protocols"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LayoutGrid className="h-5 w-5 mr-2" />
                Protocols
              </Link>
              <Link
                to="/stake-swap"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowRightLeft className="h-5 w-5 mr-2" />
                Stake & Swap
              </Link>
              <Link
                to="/docs"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Book className="h-5 w-5 mr-2" />
                Docs
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Connect Wallet
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Markets
            </Link>
            <Link
              to="/protocols"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Protocols
            </Link>
            <Link
              to="/stake-swap"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Stake & Swap
            </Link>
            <Link
              to="/docs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Docs
            </Link>
          </div>
        </div>
      </nav>


      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   
        <MarketOverview />

        {children}
      </main>
     

      <Footer />
    </div>
  );
}

function App() {

  // useEffect(() => {
  //   console.log("Tokens:", tokens);
  //   console.log("Search Query:", searchQuery);
  //   console.log("Active Filter:", activeFilter);
  //   console.log("Filtered Tokens:", filteredTokens);
  // }, [tokens, searchQuery, activeFilter, filteredTokens]);

  // useEffect(() => {
    
  //   initGA('G-F5CYHY4KS2');
  // }, []);

  return (
    <ThemeProvider>
      <Router>
        {/* <GATracker /> */}
        <Layout>
        {/* <CookieConsent
          buttonText="Accept"
          buttonStyle={{ 
            backgroundColor: "rgb(59, 130, 246)", 
            color: "white", 
            fontSize: "14px", 
            borderRadius: "0.25rem" 
          }}
        >
          This website uses cookies to enhance the user experience and to analyze traffic.
        </CookieConsent> */}
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/protocols" element={<Protocols />} />
            <Route path="/stake-swap" element={<StakeSwap />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;