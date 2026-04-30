import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { RightPanelContext, type ModelInfoContext } from "../contexts/RightPanelContext";

export function RightPanelProvider({ children }: { children: ReactNode }) {

  const [main, setMain] = useState<ModelInfoContext>(null);
  const [overlay, setOverlay] = useState<ModelInfoContext>(null);

  const closeRight = useCallback(() => {
    setMain(null);
    setOverlay(null);
  }, []);

  const value = useMemo(() => ({
    main,
    setMain,
    overlay,
    setOverlay,
    closeRight
  }), [main, overlay]);

  useEffect(() => {
    console.log("mainInfoContext changed:", main);
    console.log("overlayInfoContext changed:", overlay);
  }, [main, overlay]);

  return (
    <RightPanelContext.Provider value={value}>
      {children}
    </RightPanelContext.Provider>
  );
}