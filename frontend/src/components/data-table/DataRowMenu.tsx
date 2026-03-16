import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type RowMenuAction<T> = {
  label: string | ((row: T) => string);
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: "success" | "primary" | "warning" | "danger" | "default";
  hidden?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
};

type Props<T> = {
  row: T;
  actions: RowMenuAction<T>[];
};

export function DataRowMenu<T>({ row, actions }: Props<T>) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  const visibleActions = actions.filter(
    (action) => !action.hidden || !action.hidden(row)
  );


  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX, // largeur menu approx
    });

    // setOpen((prev) => !prev);
    if (!open) {
      setVisible(true);
      setOpen(true);
    } else {
      setOpen(false);
      setTimeout(() => setVisible(false), 150);
    }
  };

  // Fermer si click outside
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


  // fermeture au scroll
  useEffect(() => {
    if (!open) return;

    const handleClose = () => {
      setOpen(false);
      setTimeout(() => setVisible(false), 150);
    };

    window.addEventListener("scroll", handleClose, true); // capture
    window.addEventListener("resize", handleClose);

    return () => {
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", handleClose);
    };
  }, [open]);



  const getVariantClass = (variant?: string) => {
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
    <div className="">
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
            {visibleActions.map((action, index) => {
              const isDisabled = action.disabled?.(row);

              return (
                <button
                  key={index}
                  disabled={isDisabled}
                  onClick={() => {
                    if (!isDisabled) {
                      action.onClick(row);
                      setOpen(false);
                    }
                  }}
                  className={`
                    ${getVariantClass(action.variant)}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                >
                  {action.icon}
                  {typeof action.label === "function"
                    ? action.label(row)
                    : action.label
                  }
                </button>
              )}
            )}
          </div>,
          document.body
        )}
    </div>
  );
}














// import { useEffect, useRef, useState } from "react";
// import { MoreVertical } from "lucide-react";

// export type RowMenuAction<T> = {
//   label: string | ((row: T) => string);
//   icon?: React.ReactNode;
//   onClick: (row: T) => void;
//   variant?: "default" | "warning" | "danger";
//   hidden?: (row: T) => boolean;
//   disabled?: (row: T) => boolean;
// };

// type DataRowMenuProps<T> = {
//   row: T;
//   actions: RowMenuAction<T>[];
// };

// export function DataRowMenu<T>({ row, actions }: DataRowMenuProps<T>) {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const visibleActions = actions.filter(
//     (action) => !action.hidden || !action.hidden(row)
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const getVariantClass = (variant?: string) => {
//     switch (variant) {
//       case "danger":
//         return "text-red-600 hover:bg-red-50";
//       case "warning":
//         return "text-orange-600 hover:bg-orange-50";
//       default:
//         return "text-neutral-700 hover:bg-neutral-100";
//     }
//   };

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpen((prev) => !prev);
//         }}
//         className="p-1 rounded hover:bg-neutral-200"
//       >
//         <MoreVertical className="w-4 h-4" />
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-44 bg-white border border-neutral-200 rounded-md shadow-lg z-50">
//           {visibleActions.map((action, index) => {
//             const isDisabled = action.disabled?.(row);

//             return (
//               <button
//                 key={index}
//                 disabled={isDisabled}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (!isDisabled) {
//                     action.onClick(row);
//                     setOpen(false);
//                   }
//                 }}
//                 className={`
//                   w-full flex items-center gap-2 px-3 py-2 text-sm text-left
//                   ${getVariantClass(action.variant)}
//                   ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
//                 `}
//               >
//                 {action.icon}
//                 {typeof action.label === "function"
//                   ? action.label(row)
//                   : action.label
//                 }
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


