import { SignOutButton } from "@clerk/clerk-react";
import { Power } from "lucide-react";

export default function SignoutButton() {

  return (
    <SignOutButton redirectUrl="/login">
      <button type="button" className="btn-signout gap-2 transition">
        <div className="flex items-center">
        <Power className="w-6 h-6 mr-3" />
        <span>Déconnexion</span>
        </div>
      </button>
    </SignOutButton>
  )
}