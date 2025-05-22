import { useRef, useState } from "react";
import { ConnectModal } from "@mysten/dapp-kit";

type TextButtonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function ConnectTextButton({
  className,
  onClick,
  children,
  disabled,
}: TextButtonProps) {
  const audioRef = useRef(new Audio("/game-start.wav"));
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);


  const handleMouseDown = () => setClicked(true);
  const handleMouseUp = () => setClicked(false);

  const handleClick = () => {
    audioRef.current.currentTime = 0; // 클릭할 때마다 처음부터 재생
    audioRef.current.play();
    if (onClick) onClick();
  };

  return (
    <ConnectModal trigger={
      <button
        className={`
          font-retro text-xl text-white py-2 px-4 h-[46px]
          flex items-center gap-2
          transition-all duration-100 ease-in-out
          ${clicked ? "scale-95" : "scale-100"}
          retro-blink-half
          hover:border-4 hover:border-white hover:animate-none
          hover:h-[46px]
          ${className}
        `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setClicked(false)}
        disabled={disabled}
      >
        {children}
      </button>
    }
    open={open}
    onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (isOpen) {
        handleClick();
      }
    }}
    />
  );
}
