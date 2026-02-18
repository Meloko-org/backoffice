import CategoryDetails from "../../features/categories/components/CategoryDetails";
import FamilyDetails from "../../features/families/components/FamilyDetails";
import ProductDetails from "../../features/products/components/ProductDetails";
import { ConfirmPanel } from "./components/ConfirmPanel";
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
		case "family":
			content = <FamilyDetails 
									family={infoContext.data} 
									onDelete={infoContext.onDelete} 
									onEdit={infoContext.onEdit}
								/>;
			break;
		case "product":
			content = <ProductDetails 
									product={infoContext.data} 
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
      {/* <div className="w-full text-right">
				<h2 className="p-4 text-lg font-semibold">youpi</h2>
			</div> */}

			<div className={isOpen ? "pointer-events-none opacity-50" : "" }>
				<div className="text-center uppercase tracking-wide mt-3">{infoContext && infoContext.title}</div>
				<div>
					{content}
				</div>
			</div>

			{/* confirmPanel */}
			<div className="p-5">
				{options && (
					<ConfirmPanel />
				)}
			</div>

    </aside>
  );
}