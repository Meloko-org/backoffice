import { useEffect } from "react";
import { useAdminLayout } from "../layouts/admin/AdminLayoutContext";

export function useAdminPage(title: string) {
	const { setPageTitle } = useAdminLayout();

	useEffect(() => {
		setPageTitle(title);
		// fonction de cleanup: nettoie le titre quand on quitte la page
		return () => setPageTitle(null);
	}, [title, setPageTitle])
}