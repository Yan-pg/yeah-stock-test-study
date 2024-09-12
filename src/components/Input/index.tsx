import { forwardRef } from "react";
import { Icon } from "@phosphor-icons/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: Icon;
  label?: string;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon: StartIcon, label, error, ...rest }, ref) => {
    return (
      <div>
        {label && <label className="text-gray-primary">{label}</label>}
        <div className="flex items-center gap-5 bg-[#242424] border border-black-light rounded-lg px-4">
          {StartIcon && <StartIcon size={20} className="text-white" />}
          <input
            ref={ref}
            className="placeholder:text-black-light text-white bg-transparent outline-none w-full h-8 px-1"
            {...rest}
          />
        </div>
        {error && <span className="text-red-600">{label} is required</span>}
      </div>
    );
  }
);
