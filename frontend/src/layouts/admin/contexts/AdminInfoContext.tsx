import { createContext, useContext } from "react";
import type { ModelContext } from "../../../types/admin";

type AdminInfoContextType = {
	infoContext: ModelContext;
	setInfoContext: (context: ModelContext) => void;
}

export const AdminInfoContext = createContext<AdminInfoContextType | null>(null)

export function useInfoLayout() {
	const ctx = useContext(AdminInfoContext);

	if (!ctx) {
		throw new Error("useInfoLayout must be used inside AdminLayoutProvider");
	}
	
	return ctx;
}