import { useSuiClientQuery } from "@mysten/dapp-kit";


export const useAccountBalance = (address: string, coinType: string) => {
  return useSuiClientQuery(
    'getBalance',
    {
      owner: address,
      coinType: coinType,
    },
    {
      staleTime: 0,
      refetchInterval: 30000,
      retry: 3,
      enabled: !!address,
    }
  );
};
