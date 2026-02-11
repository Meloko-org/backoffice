import CategoryDetails from "../../features/categories/components/CategoryDetails";
import { useInfoLayout } from "./AdminInfoContext";
// import { useAdminLayout } from "./AdminLayoutContext";


export default function AdminSidebarRight() {

	const { infoContext } = useInfoLayout();

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
        fixed inset-y-0 right-0 z-10 w-64
      `}
      style={{ background: "var(--app-sidebar-bg)" }}
      >
      <div className="w-full text-right">
				<h2 className="p-4 text-lg font-semibold">youpi</h2>
			</div>

			<div>
				<div>{infoContext && infoContext.title}</div>
				<div>
					{content}
				</div>
			</div>
    </aside>
  );
}