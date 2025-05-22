import { useCurrentAccount } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

import { fetchPositions } from "../api/user";

export const usePositions = () => {
  const currentAccount = useCurrentAccount();

  return useQuery({
    queryKey: [
      "position",
      { round: 0, address: currentAccount ? currentAccount.address : "" },
    ],
    queryFn: () =>
      fetchPositions({
        round: 0,
        address: currentAccount ? currentAccount.address : "",
      }),
    staleTime: 0, // 1초간 캐싱 유지
    refetchInterval: 1000, // 1초마다 자동 갱신
    retry: 3, // 실패시 최대 3회 재시도
    enabled: !!currentAccount, // fetch only when account is available
  });
};
