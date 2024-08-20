import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg flex flex-col justify-center items-center gap-4">
        {children}
        <button className="primary-btn h-10 w-1/3" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
