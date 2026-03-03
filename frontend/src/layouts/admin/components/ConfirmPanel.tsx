import { useEffect, useState } from "react";
import { useConfirm } from "../contexts/ConfirmContext";
import { AnimatedButton } from "../../../components/global/buttons/AnimatedButton";
import { useInfoLayout } from "../contexts/AdminInfoContext";
import { useAdminLayout } from "../contexts/AdminLayoutContext";

export function ConfirmPanel() {

  const { options, close } = useConfirm();
  const { setInfoContext } = useInfoLayout();
  const { closeRight } = useAdminLayout();

  const [value, setValue] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!options) return null;


  const handleConfirm = async () => {
    try {
      setLoading(true);

      await options.onConfirm(value); // logique métier exécutée ici

      setLoading(false)
      setSuccess(true);

      setTimeout(() => {
        close();        // vide ConfirmContext
        closeRight();   // ferme sidebar
        setInfoContext(null); // si besoin
        setSuccess(false);
        setValue(null);
      }, 1200);

    } catch (e) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    close();
    closeRight();
    setValue(null);
  };

  useEffect(() => {
    console.log("ConfirmPanel mounted");
  }, []);

  return (
    <div className="p-6 confirm-panel shadow-xl rounded-xl">
      <h3 className="text-lg font-semibold">{options.title}</h3>

      {options.description && (
        <p className="mt-2 text-sm">{options.description}</p>
      )}

      {options.content && (
        <div className="mt-4">
          {options.content(value, setValue)}
        </div>
      )} 


      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={handleCancel}
          disabled={loading}
          className="btn-outline-secondary"
        >
          {options.cancelLabel ?? "Annuler"}
        </button>

        <AnimatedButton 
          variant="danger" 
          loading={loading} 
          onClick={handleConfirm} 
          success={success}
        >
          {options.confirmLabel ?? "Supprimer"}
        </AnimatedButton>

      </div>
    </div>
  );
}
