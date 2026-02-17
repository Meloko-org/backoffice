import { createPortal } from "react-dom";
import { useState, useRef } from "react";

type TooltipPosition =
  | "top-left"
  | "top"
  | "top-right"
  | "bottom-left"
  | "bottom"
  | "bottom-right"
  | "left"
  | "right";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
  background?: string;
  color?: string;
  offset?: number;
};

type TooltipCoords = {
  top: number;
  left: number;
  transform: string;
};


export function Tooltip({
  content,
  children,
  position = "top",
  background = "#111",
  color = "#fff",
  offset = 8,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<TooltipCoords>({ top: 0, left: 0, transform: "" });
  const ref = useRef<HTMLDivElement>(null);

  const calculatePosition = (rect: DOMRect) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    switch (position) {
      case "top-left":
        return {
          top: rect.top - offset,
          left: rect.left,
          transform: "translate(0, -100%)",
        };

      case "top":
        return {
          top: rect.top - offset,
          left: centerX,
          transform: "translate(-50%, -100%)",
        };

      case "top-right":
        return {
          top: rect.top - offset,
          left: rect.right,
          transform: "translate(-100%, -100%)",
        };

      case "bottom-left":
        return {
          top: rect.bottom + offset,
          left: rect.left,
          transform: "translate(0, 0)",
        };

      case "bottom":
        return {
          top: rect.bottom + offset,
          left: centerX,
          transform: "translate(-50%, 0)",
        };

      case "bottom-right":
        return {
          top: rect.bottom + offset,
          left: rect.right,
          transform: "translate(-100%, 0)",
        };

      case "left":
        return {
          top: centerY,
          left: rect.left - offset,
          transform: "translate(-100%, -50%)",
        };

      case "right":
        return {
          top: centerY,
          left: rect.right + offset,
          transform: "translate(0, -50%)",
        };

      default:
        return {
          top: rect.top - offset,
          left: centerX,
          transform: "translate(-50%, -100%)",
        };
    }
  };

  const handleMouseEnter = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const pos = calculatePosition(rect);

    setCoords(pos);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: coords.transform,
              background,
              color,
              padding: "6px 10px",
              borderRadius: "6px",
              fontSize: "0.75rem",
              pointerEvents: "none",
              zIndex: 9999,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "opacity 0.15s ease",
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
