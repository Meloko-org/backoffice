import { useEffect } from "react";
import { useAdminInfo, type ModelInfoContext } from "../layouts/admin/contexts/AdminInfoContext";


export function useInfoContext(context: ModelInfoContext | null) {
  const { setInfoContext } = useAdminInfo();

  useEffect(() => {
    setInfoContext(prev => {

      // 🔹 si null → simple
      if (!context) return null;
      if (!prev) return context;

      // 🔹 types différents → update
      if (prev.type !== context.type) {
        return context;
      }

      // 🔹 cas WithId
      if ("id" in context && "id" in prev) {
        if (prev.id === context.id) return prev;
        return context;
      }

      // 🔹 cas WithData
      if ("data" in context && "data" in prev) {
        // 👉 IMPORTANT : comparer une clé stable
        const prevId = (prev.data as any)?._id;
        const nextId = (context.data as any)?._id;

        if (prevId && nextId && prevId === nextId) {
          return prev;
        }

        return context;
      }

      // 🔹 fallback (types incompatibles)
      return context;

    });


  }, [context, setInfoContext]);
}

