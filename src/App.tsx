import "./App.css";
import '@mysten/dapp-kit/dist/index.css';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { ToastProvider } from "./providers/ToastProvider";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const { networkConfig } = createNetworkConfig({
    testnet: { url: import.meta.env.VITE_RPC_URL },
  });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect={true} slushWallet={{ name : 'surflex.fun' }} walletFilter={(wallet) => {
          return wallet.name === 'Slush'
        }}>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
