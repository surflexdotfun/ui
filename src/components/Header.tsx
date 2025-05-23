import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAddress } from "../hooks/useAddress";
import { useIsMobile } from "../hooks/useIsMobile";
import { formatAddress } from "../utils/address";

import NESButton from "./Button";
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";

export default function Header() {
  const audioRef = useRef(new Audio("/click.m4a"));
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const { address } = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
    audioRef.current.play();
  };

  return (
    <header className="w-full h-[60px] flex justify-between items-center px-7">
      <Link to="/" onClick={handleClick} className="flex items-center gap-1">
        <img src="/mulbangul.gif" alt="fire" className="w-6" />
        {!isMobile && <p className="text-white text-[16px]">SURFLEX.FUN</p>}
      </Link>
      {currentAccount ? (
        <div className="flex items-center gap-5">
          {!isMobile && (
            <div className="flex items-center gap-2">
              <img src="/small-chip.gif" alt="small-chip" className="w-6" />
            </div>
          )}
          <div className="relative">
            <NESButton
              onClick={() => setIsOpen(!isOpen)}
              variant="blue"
              fontSize="small"
            >
              {formatAddress(address ?? "")}
            </NESButton>

            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 bg-[#1a1a1a] border-2 border-[#003C80] rounded shadow-lg">
                <div className="py-1">
                  {isMobile && (
                    <div className="flex items-center gap-2 px-4 py-2">
                      <img
                        src="/small-chip.gif"
                        alt="small-chip"
                        className="w-6"
                      />
                      {/* TODO: CHIP Balance */}
                      <p className="text-white text-sm sm:text-[16px]">{`2,380`}</p>
                    </div>
                  )}

                  <button
                    className="w-full px-4 py-2 text-sm text-white hover:bg-[#003C80] text-left"
                    onClick={() => {
                      // Add menu item actions
                      setIsOpen(false);
                      disconnect();
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ConnectModal trigger={
            <NESButton variant="blue" fontSize="small">
              Connect Wallet
            </NESButton>
          }
        />
      )}
    </header>
  );
}
