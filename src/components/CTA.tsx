import { UserStatus } from "../types/users";

import TextButton from "./TextButton";
import ConnectTextButton from "./ConnectTextButton";

interface CTAProps {
  className?: string;
  status: UserStatus;
  onClickTextButton?: (status: UserStatus) => void;
}

export default function CTA({
  className,
  status,
  onClickTextButton,
}: CTAProps) {
  let statusToMsg = "";
  let statusToSubMsg = "";
  switch (status) {
    case "loading":
      statusToMsg = "LOADING";
      break;
    case "not_connected":
      statusToMsg = "CONNECT WALLET";
      break;
    case "connected":
      statusToMsg = "INSERT COIN";
      statusToSubMsg = "Entry fee: 0.001 SUI";
      break;
    case "participated":
      statusToMsg = "ENTER THE LEAGUE";
      statusToSubMsg = "Ready, set, trade! You've got this!";
      break;
    case "error":
      statusToMsg = "ERROR";
      break;
  }
  console.log("statusToMsg", statusToMsg);

  return (
    <div className="mb-[60px]">
      {status === "not_connected" ? (
        <>
          <ConnectTextButton 
            className={`flex items-center ${className}`}
            onClick={() => onClickTextButton && onClickTextButton(status)}
          >
            <img
              src="/triangle_pixel.svg"
              alt="Connect Wallet"
              className="mr-[16px]"
            />
            <p className="text-white font-bold text-sm sm:text-[22px]">
              {statusToMsg}
            </p>
          </ConnectTextButton>
          <small className="text-[#FFFF00] text-[10px] mt-2">
            Entry Fee: 0.001 SUI
          </small>
        </>
      ) : (
      <>
        <TextButton
        className={`flex items-center ${className}`}
        onClick={() => onClickTextButton && onClickTextButton(status)}
        >
        <img
          src="/triangle_pixel.svg"
          alt="Insert Coin"
          className="mr-[16px]"
        />
        <p className="text-white font-bold text-sm sm:text-[22px]">
          {statusToMsg}
        </p>
        </TextButton>
        {statusToSubMsg !== "" && (
        <small className="text-[#C3F92B] text-[10px] mt-2">
          {statusToSubMsg}
        </small>
        )}
      </>
      )}
    </div>
  );
}
