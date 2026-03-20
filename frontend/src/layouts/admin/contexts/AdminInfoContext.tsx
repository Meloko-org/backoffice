import { createContext, useContext } from "react";
import type { RightPanelType } from "../registries/rightPanel/rightPanelRegistry";
// import type { ModelContext } from "../../../types/admin";

export type ModelInfoContext = {
	type: RightPanelType;
	id: string;
	title?: string;
} | null;

type AdminInfoContextType = {
	infoContext: ModelInfoContext;
	setInfoContext: React.Dispatch<React.SetStateAction<ModelInfoContext>>;
	// setInfoContext: (context: ModelContext) => void;
}

export const AdminInfoContext = createContext<AdminInfoContextType | null>(null)

export function useAdminInfo() {
	const ctx = useContext(AdminInfoContext);

	if (!ctx) {
		throw new Error("useAdminInfo must be used inside AdminLayoutProvider");
	}
	
	return ctx;
}