import { useEffect } from "react";
import { useRightPanel, type ModelInfoContext } from "../layouts/admin/contexts/RightPanelContext";

export function useRightPanelMain(context: ModelInfoContext | null) {
  const { setMain } = useRightPanel();

  useEffect(() => {
    setMain(prev => {

      if (!context) return null;
      if (!prev) return context;

      if (prev.type !== context.type) {
        return context;
      }

      // WithId
      if ("id" in context && "id" in prev) {
        if (prev.id === context.id) return prev;
        return context;
      }

      // WithData
      if ("data" in context && "data" in prev) {
        const prevId = (prev.data as any)?._id;
        const nextId = (context.data as any)?._id;

        if (prevId && nextId && prevId === nextId) {
          return prev;
        }

        return context;
      }

      return context;
    });

  }, [context, setMain]);
}