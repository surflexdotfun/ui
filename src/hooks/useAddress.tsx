import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

export const useAddress = () => {
  const [address, setAddress] = useState<string | undefined>();
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    if (currentAccount) {
      setAddress(currentAccount.address);
    }
  }, [currentAccount]);

  return { address };
};
