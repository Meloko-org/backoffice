import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useUserRole } from "../../hooks/useUserRole";

export default function AdminHeader() {
  const { user } = useUser();
	const { role } = useUserRole();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <span className="text-sm text-gray-600">
        {user?.primaryEmailAddress?.emailAddress} ({role})
      </span>

      <SignOutButton>
        <button className="text-sm text-red-600 hover:underline">
          Se déconnecter
        </button>
      </SignOutButton>
    </header>
  );
}
