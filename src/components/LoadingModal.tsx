import ModalBase, { ModalBaseProps } from "./ModalBase";

export default function LoadingModal({ isOpen, onClose }: ModalBaseProps) {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Loading...">
      <img
        src="/tralalero_tralala.gif"
        alt="tralalero_tralala"
        className="w-auto h-24 mx-auto"
      />
      <p className="text-white text-[16px] text-center">Just a moment!</p>
    </ModalBase>
  );
}
