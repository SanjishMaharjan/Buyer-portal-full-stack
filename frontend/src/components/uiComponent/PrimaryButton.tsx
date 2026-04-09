import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function PrimaryButton({ children, onClick, disabled, className, icon }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}