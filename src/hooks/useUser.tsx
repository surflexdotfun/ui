import { useCurrentAccount } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { fetchUser } from "../api/user";
import { UserStatus } from "../types/users";
import { mistToSui } from "../utils/numbers";

import { useAccountBalance } from "./useAccountBalance";
import { SUI_OBJECT_ID } from "../constants";

export const useUserInfo = (address: string) => {
  return useQuery({
    queryKey: ["user", address],
    queryFn: () => fetchUser({ round: 0, address }),
    enabled: !!address, // address가 있을 때만 실행
    staleTime: 1000 * 60, // 1분 동안 캐싱 유지
    refetchOnMount: false,
    refetchInterval: false,
  });
};

export const useUser = () => {
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<UserStatus>("loading");
  const [suiBalance, setSuiBalance] = useState<number>(0);
  const currentAccount = useCurrentAccount();
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfo(
    address,
  );
  // TODO: Add CHIP balance and staked SOL balance
  const { data: suiBalanceInMist, refetch: refetchSuiBalance } =
    useAccountBalance(address, SUI_OBJECT_ID);

  // Set account status to ready when Privy is ready
  useEffect(() => {
    if (!currentAccount) {
      setStatus("not_connected");
      setAddress("");
      setSuiBalance(0);
      return;
    }
    // Use authenticated when Privy is only ready
    if (currentAccount) {
      setStatus("connected");
      setAddress(currentAccount.address);
    }
    // If user info is fetched, set account status to participated
    // TODO: add logic to change state with information related to staked SOL and CHIP balance
    if (userInfo) {
      if (userInfo.totalEstimatedUSD > 0) {
        setStatus("participated");
      } else {
        setStatus("connected");
      }
    }
  }, [currentAccount, userInfo]);

  useEffect(() => {
    if (suiBalanceInMist) {
      setSuiBalance(mistToSui(suiBalanceInMist.totalBalance));
    }
  }, [suiBalanceInMist]);

  return {
    status,
    address,
    userInfo,
    suiBalance,
    refetchUserInfo,
    refetchSuiBalance,
  };
};
