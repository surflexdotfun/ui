interface LogoSectionProps {
  className?: string;
  isMobile?: boolean;
}

const LogoSection = ({ className = "", isMobile }: LogoSectionProps) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      {isMobile ? (
        <>
          <img src="/pepe-punch.gif" alt="pepe-punch" className="w-[128px]" />
          <div className="mx-8 mt-4">
            <img src="/logo.png" alt="logo" />
          </div>
        </>
      ) : (
        <img src="/logo.png" alt="logo" />
      )}

      <div className="mt-[44px] text-md sm:text-[28px] text-[#54D2FF]">
        ARE YOU THE NEXT{" "}
        <br />
        100x TRADER?{" "}
      </div>
    </div>
  );
};

export default LogoSection;
