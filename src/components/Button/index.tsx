import { Icon } from "@phosphor-icons/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: Icon;
  variant?: "primary" | "error";
}

export function Button({
  startIcon: StartIcon,
  children,
  variant = "primary",
  ...rest
}: ButtonProps) {
  const variantClass =
    variant === "error"
      ? "w-fit bg-transparent text-red-400 border-none flex items-center justify-center gap-2 py-1 px-5 h-8"
      : "w-full bg-blue-dark text-white border-none rounded-lg flex items-center justify-center gap-2 py-1 px-5 h-8";

  return (
    <button {...rest} className={variantClass}>
      {StartIcon && <StartIcon size={20} weight="bold" />}
      {children}
    </button>
  );
}
