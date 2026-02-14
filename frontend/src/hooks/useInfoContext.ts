import { useEffect } from "react";
import { useInfoLayout } from "../layouts/admin/contexts/AdminInfoContext";
import type { ModelContext } from "../types/admin";


export function useInfoContext(
	context: ModelContext | null,
) {

  const { setInfoContext } = useInfoLayout();
  
	useEffect(() => {
    setInfoContext(context);

		// fonction de cleanup
    return () => {
      setInfoContext(null);
    };
		
  }, [context, setInfoContext]);

}
