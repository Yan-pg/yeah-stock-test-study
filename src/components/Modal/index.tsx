import { X } from "@phosphor-icons/react";

import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, children, onClose }: ModalProps) {
  const state = open ? "open" : "closed";

  return (
    <div>
      <div
        data-state={state}
        className="data-[state=closed]:hidden fixed inset-0 bg-slate-800/50"
      ></div>
      <div
        data-state={state}
        className="w-80 transition-all data-[state=open]:animate-fade-in-modal data-[state=closed]:animate-fade-out-modal data-[state=open]:translate-x-0 data-[state=closed]:translate-x-[100%]  bg-black-light fixed right-0 top-0 bottom-0"
      >
        <div className="flex justify-end mt-6 pr-10 text-white">
          <button onClick={onClose}>
            <X size={32} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
