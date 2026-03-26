import { createContext, useContext } from "react";
import type { RightPanelType } from "../registries/rightPanel/rightPanelRegistry";
import type { ProductLine } from "../../../features/orders/types/order";
// import type { ModelContext } from "../../../types/admin";

export type WithId<T extends RightPanelType> = {
  type: T;
  id: string;
  title?: string;
};

export type WithData<T extends RightPanelType, D> = {
  type: T;
  data: D;
  title?: string;
};


export type ModelInfoContext =
  | WithId<"category">
	| WithId<"family">
  | WithId<"product">
	| WithId<"market">
  | WithId<"user">
  | WithId<"userPage">
  | WithId<"order">
  | WithData<"orderProduct", ProductLine>
  | null;

type AdminInfoContextType = {
	infoContext: ModelInfoContext;
	setInfoContext: React.Dispatch<React.SetStateAction<ModelInfoContext>>;
}

export const AdminInfoContext = createContext<AdminInfoContextType | null>(null)

export function useAdminInfo() {
	const ctx = useContext(AdminInfoContext);

	if (!ctx) {
		throw new Error("useAdminInfo must be used inside AdminLayoutProvider");
	}
	
	return ctx;
}