import CategoryDetails from "../../features/categories/components/CategoryDetails";
import FamilyDetails from "../../features/families/components/FamilyDetails";
import MarketDetails from "../../features/markets/components/MarketDetails";
import OrderDetails from "../../features/orders/components/OrderDetails";
import ProductDetails from "../../features/products/components/ProductDetails";
import UserDetails from "../../features/users/components/UserDetails";
import { ConfirmPanel } from "./components/ConfirmPanel";
import { useInfoLayout } from "./contexts/AdminInfoContext";
import { useAdminLayout } from "./contexts/AdminLayoutContext";
import { useConfirm } from "./contexts/ConfirmContext";


export default function AdminSidebarRight() {

	const { infoContext, setInfoContext } = useInfoLayout();
	const { options, close, isConfirmOpen } = useConfirm();
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
		case "market":
			content = <MarketDetails 
									market={infoContext.data} 
									onDelete={infoContext.onDelete} 
									onEdit={infoContext.onEdit}
								/>;
			break;
		case "user":
			content = <UserDetails 
									user={infoContext.data} 
									onDelete={infoContext.onDelete} 
									onEdit={infoContext.onEdit}
								/>;
			break;
		case "order":
			content = <OrderDetails 
									order={infoContext.data} 
									onDelete={infoContext.onDelete} 
									onEdit={infoContext.onEdit}
								/>;
			break;
	}

		
  return (
    <aside
      className={`
        fixed inset-y-0 right-0 w-120 
				${isConfirmOpen ? "z-50" : "z-10"}
				${!content ? "flex items-center" : ""}
      `}
      style={{ background: "var(--app-sidebar-bg)" }}
      >

				{/* Si un content est défini, on l'affiche */}
				{content && (
					<div className={`${infoContext?.type !== "order" ? "h-[80%] overflow-y-auto" : ""} `}>
						<div className={isConfirmOpen ? "pointer-events-none opacity-50" : "" }>
							<div className="text-center uppercase tracking-wide mt-3">
								{infoContext && infoContext.title}
							</div>
							<div>
								{content}
							</div>
						</div>
					</div>
				)}
			

			<div className={`${content ? "h-[20%]" : "h-auto w-full"}`}>
				{/* si les options du confirmPanel sont définies, on affiche confirmPanel */}
				<div className="p-2">
					{options && (
						<ConfirmPanel />
					)}
				</div>
			</div>

    </aside>
  );
}