import NESButton from "./Button";
import ModalBase from "./ModalBase";

type InsertCoinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  again?: boolean;
};

export default function InsertCoinModal({
  isOpen,
  onClose,
  onConfirm,
  again,
}: InsertCoinModalProps) {
  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      {again ? (
        <div className="text-white text-[16px] text-left flex flex-col gap-2">
          <div>INSERT COIN TO START FRESH!</div>
        </div>
      ) : (
        <div className="text-white text-[16px] text-left flex flex-col gap-2">
          <div>INSERT COIN TO JOIN!</div>
        </div>
      )}

      <img src="/coin.gif" alt="coin" className="w-auto h-24 mx-auto" />

      <p className="text-white text-[16px] text-center">0.001 SUI TO PLAY</p>

      <div className="flex justify-center gap-3 sm:gap-6">
        <NESButton fontSize="small" audio="cancel" onClick={onClose}>
          Cancel
        </NESButton>
        <NESButton
          variant="primary"
          fontSize="small"
          onClick={() => onConfirm()}
        >
          Insert
        </NESButton>
      </div>
    </ModalBase>
  );
}
