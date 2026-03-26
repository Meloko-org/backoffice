import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";
import Loader from "../components/admin/Loader";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
	
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-warning">
        <Loader />
      </div>
    );
  }

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
