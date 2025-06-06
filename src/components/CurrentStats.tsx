import RetroBox from "./RetroBox";

export default function CurrentStats() {
  return (
    <div className="my-[40px] w-full px-4 flex flex-col gap-2 xl:flex-row items-center justify-center">
      <div className="w-full lg:w-auto flex flex-col gap-2 justify-center items-center sm:flex-row">
        <RetroBox className="w-full sm:w-fit">
          <div className="border-[4px] border-[#F76B3E] flex flex-col items-center justify-center text-center p-7">
            <img src="/mulbangul.gif" alt="fire" className="w-10 h-10 mb-4" />
            <p className="text-white font-retro text-[11px]">
              Live Trader Count
            </p>
            <p className="text-[#F76B3E] text-[28px] font-retro my-4">1,200+</p>
            <p className="text-white font-retro text-[11px]">
              traders competing now!
            </p>
          </div>
        </RetroBox>
        <RetroBox className="w-full sm:w-fit">
          <div className="border-[4px] border-[#54D2FF] flex flex-col items-center justify-center text-center p-7">
            <img src="/mulbangul.gif" alt="fire" className="w-10 h-10 mb-4" />
            <p className="text-white font-retro text-[11px]">
              Total Prize Pool
            </p>
            <p className="text-[#54D2FF] text-[28px] font-retro my-4">
              250k+ SUI
            </p>
            <p className="text-white font-retro text-[11px]">
              in prizes available!
            </p>
          </div>
        </RetroBox>
      </div>
      <RetroBox className="w-full sm:w-fit">
        <div className="border-[4px] border-[#FFFF00] flex flex-col items-center justify-center text-center p-7">
          <img src="/mulbangul.gif" alt="fire" className="w-10 h-10 mb-4" />
          <p className="text-white font-retro text-[11px]">Win up to</p>
          <p className="text-[#FFFF00] text-[28px] font-retro my-4">
            {"100K SUI!(+100,000%)"}
          </p>
          <p className="text-white font-retro text-[11px]">
            Top traders take home massive rewards!
          </p>
        </div>
      </RetroBox>
    </div>
  );
}
