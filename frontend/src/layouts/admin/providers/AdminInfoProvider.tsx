import { useMemo, useState, type ReactNode } from "react";
import { AdminInfoContext } from "../contexts/AdminInfoContext";
import type { ModelContext } from "../../../types/admin";

type Props = {
  children: ReactNode;
}

export default function AdminInfoProvider({ children }: Props) {
  
	const [ infoContext, setInfoContext ] = useState<ModelContext>(null);

	const value = useMemo(
		() => ({
			infoContext,
			setInfoContext,
		}),
		[infoContext]
	);

	return (
		<AdminInfoContext.Provider value={value}>
			{children}
		</AdminInfoContext.Provider>
	)

}