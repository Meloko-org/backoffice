import DarkModeToggle from "../../components/global/DarkModeToggle";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Meloko</h1>
      <p className="text-gray-600">
        Retrouvez ici des tutoriels pour apprendre à utiliser l’application.
      </p>

      <DarkModeToggle />


    </div>
  );
}