export default function AdminSidebarLeft() {
  return (
    <aside 
      className="fixed left-0 top-0 z-10 h-full w-65"
      style={{ background: "var(--app-sidebar-bg)" }}
      >
      <div className="w-full text-right">
				<h2 className="p-4 text-lg font-semibold">Historique</h2>
			</div>
    </aside>
  );
}
