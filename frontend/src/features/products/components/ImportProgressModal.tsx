import { ProgressBar } from "./ProgressBar";

type Props = {
  status: "dryRun" | "importing";
};

export function ImportProgressModal({ status }: Props) {
  const label =
    status === "dryRun"
      ? "Analyse du fichier en cours…"
      : "Import des produits en cours…";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {label}
        </h2>

        <ProgressBar />

        <p className="mt-4 text-sm text-gray-600">
          Merci de patienter, cela peut prendre quelques instants.
        </p>
      </div>
    </div>
  );
}
