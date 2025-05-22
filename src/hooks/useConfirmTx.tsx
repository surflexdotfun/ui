import { useSuiClient } from "@mysten/dapp-kit";
import { useState, useCallback, useEffect } from "react";

type ConfirmationStatus = "idle" | "loading" | "success" | "error";

export const useConfirmTx = () => {
  const [status, setStatus] = useState<ConfirmationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [currentDigest, setCurrentDigest] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setStatus("idle");
    setError(null);
    setAttempts(0);
    setCurrentDigest(null);
  }, []);

  const confirmTx = useCallback(
    (digest: string) => {
      // Reset previous state if there was any
      resetState();

      // Set loading state and signature
      setStatus("loading");
      setCurrentDigest(digest);

      // This will trigger the useEffect below
    },
    [resetState]
  );
  const suiClient = useSuiClient();

  useEffect(() => {
    if (status !== "loading" || !currentDigest || !suiClient) return;


    let timeoutId: NodeJS.Timeout;

    const checkTransaction = async () => {
      try {
        const transactionBlockResponse = await suiClient.getTransactionBlock({
          digest: currentDigest,
        });

        if (transactionBlockResponse.checkpoint) {
          setStatus("success");
          return;
        }

        // Transaction failed on blockchain
        throw new Error("Transaction failed on blockchain");
      } catch (err) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 5) {
          setStatus("error");
          setError(
            err instanceof Error
              ? err.message
              : "Transaction confirmation failed"
          );
        } else {
          // Schedule next attempt in 1 second
          timeoutId = setTimeout(checkTransaction, 1000);
        }
      }
    };

    // Start checking immediately
    checkTransaction();

    // Cleanup timeout on unmount or status change
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status, currentDigest, attempts]);

  return {
    confirmTx,
    status,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
    attempts,
    reset: resetState,
  };
};
