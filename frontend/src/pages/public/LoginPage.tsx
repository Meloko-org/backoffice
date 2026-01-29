import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn forceRedirectUrl="./post-login"/>
    </div>
  );
}
