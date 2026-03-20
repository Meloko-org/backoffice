import { useEffect } from "react";
import { useAdminInfo, type ModelInfoContext } from "../layouts/admin/contexts/AdminInfoContext";




export function useInfoContext(context: ModelInfoContext | null) {
  const { setInfoContext } = useAdminInfo();

  useEffect(() => {
    setInfoContext(prev => {
      if (
        prev?.id === context?.id &&
        prev?.type === context?.type
      ) {
        return prev;
      }
      return context;
    });

    return () => {
      setInfoContext(prev => {
        if (prev === null) return prev;
        return null;
      });
    };
  }, [context?.id, context?.type, setInfoContext]);

}
