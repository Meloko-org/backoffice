
import { SignOutButton } from "@clerk/clerk-react";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Meloko</h1>
      <p className="text-gray-600">
        Retrouvez ici des tutoriels pour apprendre à utiliser l’application.
      </p>
			<SignOutButton>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
            Se déconnecter
          </button>
        </SignOutButton>
    </div>
  );
}