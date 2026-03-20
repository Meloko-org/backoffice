import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AdminInfoContext, type ModelInfoContext } from "../contexts/AdminInfoContext";

type Props = {
  children: ReactNode;
}

export default function AdminInfoProvider({ children }: Props) {
  
	const [ infoContext, setInfoContext ] = useState<ModelInfoContext>(null);

	const value = useMemo(
		() => ({
			infoContext,
			setInfoContext,
		}),
		[infoContext]
	);

	useEffect(() => {
		console.log("infoContext changed:", infoContext);
	}, [infoContext]);

	return (
		<AdminInfoContext.Provider value={value}>
			{children}
		</AdminInfoContext.Provider>
	)

}