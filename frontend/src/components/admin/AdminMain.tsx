export default function AdminMain() {
  const { isHistoryOpen, isToolsOpen } = useAdminLayout();

  return (
    <div
      className={`
        relative z-20 flex h-full flex-col
        bg-background text-foreground
        transition-[margin] duration-300 ease-in-out
        isolate
        ${isHistoryOpen ? "ml-65" : "ml-0"}
        ${isToolsOpen ? "mr-65" : "mr-0"}
      `}
    >
      <AdminHeader />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
