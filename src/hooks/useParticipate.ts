import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from '@mysten/sui/transactions';

import { useCallback, useEffect, useState } from "react";

import { useConfirmTx } from "./useConfirmTx";
import { useUser } from "./useUser";
import { POOL_PACKAGE_ID, MODULE_NAME, FUNCTION_NAME, STAKE_OBJECT_ID } from "../constants";

interface ParticipateResult {
  participateRound: () => Promise<void>;
  isLoading: boolean;
  isFinished: boolean;
  error: string | null;
}

/**
 * Custom hook for participating in a round of the protocol
 *
 * This hook handles all the necessary steps for participating in a round:
 * 1. Checking if user has the required reward tokens
 * 2. Creating necessary token accounts if they don't exist
 * 3. Building and sending the participation transaction
 * 4. Handling transaction confirmation and state updates
 *
 * @returns {ParticipateResult} Object containing the participate function and state variables
 */
export const useParticipate = (): ParticipateResult => {
  const [txDigest, setTxDigest] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const { refetchUserInfo } = useUser();
  const { confirmTx, status } = useConfirmTx();

  const resetStates = () => {
    setIsLoading(true);
    setIsFinished(false);
    setTxConfirmed(false);
    setError(null);
  };

  const signAndExecuteTx = async (tx: Transaction) => {
    return await new Promise<string>((resolve, reject) => {
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (res) => {
            resolve(res.digest);
          },
          onError: (err) => {
            reject(err);
          },
        }
      );
    });
  };

  // Main function to participate in a round
  const participateRound = useCallback(
    async () => {
      resetStates();

      if (!currentAccount) {
        setError("Wallet not ready");
        setIsLoading(false);
        return;
      }

      try {
        const tx = new Transaction();
        const AMOUNT = 1_000_000; // 0.001 SUI
        const [fee] = tx.splitCoins(tx.gas, [AMOUNT]);
        tx.moveCall({
          target: `${POOL_PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_NAME}`,
          arguments: [
            tx.object(STAKE_OBJECT_ID),
            fee,
          ]
        });
        tx.setGasBudget(50_000_000);
        const digest = await signAndExecuteTx(tx);
        setTxDigest(digest);
        console.log(`Participation transaction sent! Signature: ${digest}`);
      } catch (error: unknown) {
        console.error("Error in participateRound:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setError(`Transaction failed: ${errorMessage}`);
        setIsLoading(false);
      }
    },
    [currentAccount]
  );

  // Handle transaction confirmation
  useEffect(() => {
    if (txDigest) {
      confirmTx(txDigest);
    }
  }, [txDigest, confirmTx]);

  // Update state based on transaction confirmation status
  useEffect(() => {
    if (status === "success") {
      setTxConfirmed(true);
    }
    if (status === "error") {
      setError("Transaction failed to confirm");
      setIsLoading(false);
      setIsFinished(true);
    }
  }, [status]);

  // Refresh user info after transaction confirmation
  useEffect(() => {
    if (txConfirmed) {
      // Set a timeout to delay the start of the interval
      const timeout = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          refetchUserInfo();
          count++;
          if (count >= 3) {
            clearInterval(interval);
            setIsLoading(false);
            setIsFinished(true);
          }
        }, 1500);
      }, 3000); // Start after 3 seconds

      // Clean up timeout if the component is unmounted or txConfirmed changes
      return () => clearTimeout(timeout);
    }
  }, [txConfirmed, refetchUserInfo]);

  return { participateRound, isLoading, isFinished, error };
};
