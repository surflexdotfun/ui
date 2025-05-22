import { useCurrentWallet, useSignPersonalMessage } from "@mysten/dapp-kit";
import { useCallback } from "react";

export const useSignData = () => {
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  const signMessage = (signingMsg: string) => (): Promise<string> => {
    return new Promise((resolve, reject) => {
      signPersonalMessage(
        {
          message: Buffer.from(signingMsg),
        },
        {
          onSuccess: (data) => {
            console.log("Signature:", data);
            resolve(data.signature);
          },
          onError: (error) => {
            reject(error);
          }
        }
      );
    });
  };

  const signingMsg = "sign in surflex.fun:1841263854";

  const signData = useCallback(async () => {
    if (connectionStatus === "disconnected") {
      return;
    }
    const wallet = currentWallet;
    if (!wallet) {
      return;
    }

    try {
      const signature = await signMessage(signingMsg)();
      if (!signature) {
        return;
      }
      return {
      pubkey: wallet.accounts[0].address,
      msg: signingMsg,
      signature,
      };
    } catch (error) {
      console.error("Error signing message:", error);
      return;
    }
  }, [currentWallet]);

  return { signData };
};
