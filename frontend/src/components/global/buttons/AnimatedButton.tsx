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
      "bg-primary text-white hover:bg-primary/70",
    danger:
      "bg-danger text-white hover:bg-danger/70",
    secondary:
      "bg-secondary text-white hover:bg-secondary/70",
  };

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`${base} ${variants[variant]} ${
        loading ? "cursor-not-allowed" : ""
      }`}
    >
      {!loading && !success && children}

      {loading && (
        <span className="loading-dots">
          <span />
          <span />
          <span />
        </span>
      )}

      {success && <span className="text-lg">✓</span>}
    </button>
  );
}


  

