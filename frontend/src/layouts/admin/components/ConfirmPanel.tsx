import { useState } from "react";
import { useConfirm } from "../contexts/ConfirmContext";
import { AnimatedButton } from "../../../components/global/buttons/AnimatedButton";
import { useInfoLayout } from "../contexts/AdminInfoContext";
import { useAdminLayout } from "../contexts/AdminLayoutContext";

export function ConfirmPanel() {
  const { options, close } = useConfirm();
  const { setInfoContext } = useInfoLayout();
  const { closeRight } = useAdminLayout();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!options) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await options.onConfirm();

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        close();
        setSuccess(false);
        setInfoContext(null);
        closeRight();
      }, 700);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 confirm-panel shadow-xl rounded-xl">
      <h3 className="text-lg font-semibold">{options.title}</h3>

      {options.description && (
        <p className="mt-2 text-sm">{options.description}</p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <AnimatedButton variant="secondary" onClick={close} disabled={loading}>
          {options.cancelLabel ?? "Annuler"}
        </AnimatedButton>

        <AnimatedButton variant="danger" loading={loading} onClick={handleConfirm} success={success}>
          {options.confirmLabel ?? "Supprimer"}
        </AnimatedButton>
      </div>
    </div>
  );
}
