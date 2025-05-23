import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "../types/users";
import { formatRank } from "../utils/rank";

import AddressCopy from "./AddressCopy";
import NESButton from "./Button";
import Divider from "./Divider";
import InsertCoinModal from "./InsertCoinModal";
import LoadingModal from "./LoadingModal";
import RetroBox from "./RetroBox";
import { useParticipate } from "../hooks/useParticipate";

type ProfileProps = {
  address: string;
  user?: UserInfo;
};

export default function MyProfile({
  address,
  user,
}: ProfileProps) {
  const navigate = useNavigate();
  // const { depositSol, isLoading, isFinished } = useDepositSol();
  const { participateRound, isLoading, isFinished } = useParticipate();

  // Modal
  const [isChipModalOpen, setIsChipModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  const handleClickReEnter = () => {
    setIsChipModalOpen(false);
    if (balance === 10000) {
      return;
    }
    try {
      participateRound();
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoadingModalOpen(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isFinished) {
      setIsLoadingModalOpen(false);
    }
  }, [isFinished]);

  const INITIAL_BALANCE = 10000;

  const balance = user ? user.totalEstimatedUSD : 0;
  const rank = user ? user.rank : 0;
  const formattedBalance = balance.toLocaleString();
  const pnl = user ? user.totalEstimatedUSD - INITIAL_BALANCE : 0;
  const pnlPercentage = (pnl / INITIAL_BALANCE) * 100;

  return (
    <div className="border-4 border-white p-[6px]">
      <RetroBox className="w-full">
        <div
          className="border-4 p-5 sm:px-10 sm:py-8 w-80 sm:w-120
          flex flex-col gap-9"
        >
          {/* Profile Header */}
          <div className="flex flex-row justify-between items-center">
            <p className="text-xs sm:text-[16px] text-left">My Profile</p>
          </div>

          {/* Profile Body */}
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex gap-5 items-center justify-center">
              <img
                src="/default-profile.png"
                alt="profile"
                className="w-[30px] h-[30px] rounded-[15px]"
              />
              <AddressCopy address={address} />
            </div>
          </div>

          <Divider char="^" color="text-[#FFF828]" />

          <div className="flex w-full gap-5 items-center justify-start">
            <p className="text-[16px]">My League Stats</p>
            <img src="/trophy.gif" alt="coin" className="h-[30px]" />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-5 items-center justify-center">
              <img src="/coin.gif" alt="coin" className="h-[30px]" />
              <p>{`${formattedBalance} funUSD`}</p>
            </div>
            <div className="flex flex-col items-stretch gap-2">
              <div className="flex text-[16px] h-[32px] items-center justify-between px-4 sm:px-8 gap-4">
                <p>{`RANK: `}</p>
                <p>{formatRank(rank)}</p>
              </div>
              <div className="flex text-[16px] h-[32px] items-center justify-between px-4 sm:px-8 gap-4">
                <p>PNL: </p>
                {pnl > 0 ? (
                  <p className="text-green-500">{`+${pnlPercentage.toFixed(
                    2
                  )}%`}</p>
                ) : pnl < 0 ? (
                  <p className="text-red-500">{`${pnlPercentage.toFixed(
                    2
                  )}%`}</p>
                ) : (
                  <p>{`${pnlPercentage.toFixed(2)}%`}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <NESButton
              onClick={() => navigate(`/profile/${address}`)}
              className="w-full"
              variant="default"
              fontSize="small"
            >
              VIEW PROFILE
            </NESButton>
            <NESButton
              className="w-full"
              variant="red"
              fontSize="small"
              onClick={() => {
                if (isLoading) {
                  setIsLoadingModalOpen(true);
                } else {
                  setIsChipModalOpen(true);
                }
              }}
            >
              RE-ENTER
            </NESButton>
          </div>
        </div>
      </RetroBox>
      <InsertCoinModal
        isOpen={isChipModalOpen}
        onClose={() => setIsChipModalOpen(false)}
        onConfirm={handleClickReEnter}
        again
      />
      <LoadingModal
        isOpen={isLoadingModalOpen}
        onClose={() => setIsLoadingModalOpen(false)}
      />
    </div>
  );
}
