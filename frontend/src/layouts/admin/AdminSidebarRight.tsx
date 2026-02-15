import CategoryDetails from "../../features/categories/components/CategoryDetails";
import { useAdminList } from "../../hooks/useAdminList";
import { useInfoLayout } from "./contexts/AdminInfoContext";
import { useAdminLayout } from "./contexts/AdminLayoutContext";
import { useConfirm } from "./contexts/ConfirmContext";


export default function AdminSidebarRight() {

	const { infoContext, setInfoContext } = useInfoLayout();
	const { options, close, isOpen } = useConfirm();
	const { closeRight } = useAdminLayout();

	let content = null;

	if (!infoContext) {
		content = null;
	}

	switch (infoContext?.type) {
		case "category":
			content = <CategoryDetails 
									category={infoContext.data} 
									onDelete={infoContext.onDelete} 
									onEdit={infoContext.onEdit}
								/>;
			break;
	}

		
  return (
    <aside
      className={`
        fixed inset-y-0 right-0 w-96 ${isOpen ? "z-50" : "z-10"}
      `}
      style={{ background: "var(--app-sidebar-bg)" }}
      >
      <div className="w-full text-right">
				<h2 className="p-4 text-lg font-semibold">youpi</h2>
			</div>

			<div className={isOpen ? "pointer-events-none opacity-50" : "" }>
				<div className="text-center">{infoContext && infoContext.title}</div>
				<div>
					{content}
				</div>
			</div>

			{/* confirmPanel */}
			<div className="p-5">
				{options && (
					<div className="p-6 confirm-panel shadow-xl rounded-xl">
						<div className="w-full  p-6 ">
							<h3 className="text-lg font-semibold">{options.title}</h3>

							{options.description && (
								<p className="mt-2 text-sm">
									{options.description}
								</p>
							)}

							<div className="mt-6 flex justify-end gap-3">
								<button
									onClick={close}
									className="px-4 py-2 rounded-md border"
								>
									{options.cancelLabel ?? "Annuler"}
								</button>

								<button
									onClick={async () => {
										await options.onConfirm();		// exécute la suppression
										close();											// ferme la popup de confirmation
										setInfoContext(null);					// vide infoContext
										closeRight();									// ferme la sidebar droite
									}}
									className="btn-danger"
								>
									{options.confirmLabel ?? "Supprimer"}
								</button>
							</div>
						</div>
					</div>
				)}

			</div>

    </aside>
  );
}