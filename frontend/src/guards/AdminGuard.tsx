import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";
import { BallTriangle } from "react-loader-spinner";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
	
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-warning">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#98B66E"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
