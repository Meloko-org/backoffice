import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ResolvedAction } from "../../layouts/admin/registries/actions/action.types";

type Props = {
  actions: ResolvedAction[]
}

export function DataRowMenu({ actions }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);


  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX,
    });

    if (!open) {
      setVisible(true);
      setOpen(true);
    } else {
      setOpen(false);
      setTimeout(() => setVisible(false), 150);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClose = () => {
      setOpen(false);
      setTimeout(() => setVisible(false), 150);
    };

    window.addEventListener("scroll", handleClose, true);
    window.addEventListener("resize", handleClose);

    return () => {
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", handleClose);
    };
  }, [open]);

  const getVariantClass = (variant?: Props["actions"][number]["variant"]) => {
    switch (variant) {
      case "danger":
        return "text-danger hover:bg-danger/20";
      case "warning":
        return "text-warning hover:bg-warning/20";
      default:
        return "row-menu-btn-default";
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        className="row-menu-trigger"
        onClick={toggleMenu}
      >
        ⋮
      </button>

      {visible &&
        createPortal(
          <div
            ref={menuRef}
            className={`row-menu row-menu-ctn fixed z-50 ${open ? "open" : ""}`}
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {actions.map((action, index) => {
              return (
                <button
                  key={index}
                  disabled={action.disabled}
                  onClick={() => {
                    if (!action.disabled) {
                      action.run()
                      setOpen(false)
                    }
                  }}
                  className={`
                    ${getVariantClass(action.variant)}
                    ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {action.icon && <action.icon className="h-4 w-4" />}
                  {action.label}
                </button>
              )
            })}
          </div>,
          document.body
        )}
    </div>
  );
}