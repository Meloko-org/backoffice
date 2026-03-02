import { useState, useEffect } from "react";

type AnimatedButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  variant?: "primary" | "danger" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function AnimatedButton({
  children,
  loading = false,
  success = false,
  variant = "primary",
  disabled,
  ...props
}: AnimatedButtonProps) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center relative overflow-hidden min-w-[120px]";

  const variants = {
    primary:
      "btn-primary",
    danger:
      "btn-danger",
    secondary:
      "btn-outline-secondary",
  };

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`
        ${base} 
        ${success && !loading ? "btn-success" : variants[variant]} 
        ${loading ? "cursor-not-allowed" : ""}
      `}
    >
      {!loading && !success && children}

      {loading && (
        <span className="loading-dots">
          <span />
          <span />
          <span />
        </span>
      )}

      {!loading && success && <span className="text-lg">✓</span>}
    </button>
  );
}


  

