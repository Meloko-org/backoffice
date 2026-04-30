import { ConfirmPanel } from "./components/ConfirmPanel";
import { rightPanelRegistry } from "./registries/rightPanel/rightPanelRegistry";
import { renderRightPanel } from "../../helpers/rightPanelHelper";
import { AnimatePresence, motion } from "motion/react";
import { useRightPanel } from "./contexts/RightPanelContext";


export default function AdminSidebarRight() {

  const { main, overlay } = useRightPanel();

  const panelConfig = main
    ? rightPanelRegistry[main.type]
    : null;

  if (!main && !overlay) return null;

	const level = main?.level ?? 0;
	const direction = main?.direction ?? "forward";

	const variants = {
		enter: (direction: "forward" | "back") => ({
			x: direction === "forward" ? 100 : -100,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: "forward" | "back") => ({
			x: direction === "forward" ? -100 : 100,
			opacity: 0,
		}),
	};

  return (
    <aside 
			className={`
        fixed inset-y-0 right-0 w-120 flex flex-col
				${overlay ? "z-50" : "z-10"}
      `} 
			style={{ background: "var(--app-sidebar-bg)" }}
		>

      {/* MAIN */}
      {main && panelConfig && (
        <div className="flex-1 overflow-y-auto">
          <div className={overlay ? "pointer-events-none opacity-50" : ""}>
						<div className="text-center uppercase tracking-wide pt-2 font-semibold">
							{main.title}
						</div>
            <AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={
									main.type +
									(("id" in main && main.id) ||
										("data" in main && (main.data as any)?._id) ||
										"")
								}

								custom={direction}

								variants={variants}

								initial={level > 0 ? "enter" : false}
								animate="center"
								exit={level > 0 ? "exit" : undefined}

								transition={{ duration: 0.25 }}
							>
								{renderRightPanel(panelConfig as any, main as any)}
							</motion.div>
						</AnimatePresence>
          </div>
        </div>
      )}

      {/* CONFIRM */}
      {overlay?.type === "confirm" && (
        <div
          className={
            main
              ? "p-2"
              : "flex items-center justify-center h-full p-4"
          }
        >
          <ConfirmPanel context={overlay} />
        </div>
      )}

    </aside>
  );
}

// export default function AdminSidebarRight() {


// 	const { main, overlay } = useAdminInfo();

// 	const panelConfig = main
// 		? rightPanelRegistry[main.type]
// 		: null;

// 		const level = main?.level ?? 0;
// 		const direction = main?.direction ?? "forward"

// 	const initialX = direction === "forward" ? "100%" : "-100%";
// 	const exitX = direction === "forward" ? "-100%" : "100%";


// 	if (!overlay || !main) return null;


// 	const PanelComponent = panelConfig?.component ?? null;
// 	const isFullPanel = panelConfig?.fullPanel;

// 	const confirmOptions = 
// 		overlay?.type === "confirm" ? overlay.data : null;

// 	const isConfirmOnly = overlay?.type === "confirm" && !main;

// 	console.log("overlay:", overlay);
		
//   return (
//     <aside
      // className={`
      //   fixed inset-y-0 right-0 w-120 flex flex-col
			// 	${overlay ? "z-50" : "z-10"}
      // `} 
//       style={{ background: "var(--app-sidebar-bg)" }}
//       >


// 				{PanelComponent && main && (
// 					<div className="flex-1 overflow-y-auto">
// 						<div className={overlay ? "pointer-events-none opacity-50" : ""}>
							// <div className="text-center uppercase tracking-wide pt-2 font-semibold">
							// 	{main.title}
							// </div>

// 							<AnimatePresence mode="wait">
// 								<motion.div
// 									key={main.type + (("id" in main && main.id) || "")}
// 									initial={
// 										level > 0
// 											? { x: direction === "forward" ? 100 : -100, opacity: 0 }
// 											: false
// 									}
// 									animate={{ x: 0, opacity: 1 }}
// 									exit={
// 										level > 0
// 											? { x: direction === "forward" ? -100 : 100, opacity: 0 }
// 											: undefined
// 									}
// 									transition={{ duration: 0.2 }}
// 								>
// 									{renderRightPanel(panelConfig as any, main as any)}
// 								</motion.div>
// 							</AnimatePresence>
// 						</div>
// 					</div>
// 				)}
			


// 				{overlay?.type === "confirm" && (
// 					<div className={`
// 						${main ? "p-2 border-t" : "flex-1 flex items-center justify-center p-4"}
// 					`}>
// 						<ConfirmPanel context={overlay}/>
// 					</div>
// 				)}

//     </aside>
//   );
// }