import { useState } from "react";
import { AnimatedButton } from "../../../components/global/buttons/AnimatedButton";
import { useRightPanel, type ModelInfoContext } from "../contexts/RightPanelContext";

type Props = {
  context: Extract<ModelInfoContext, { type: "confirm" }>
}

export type ConfirmOptions<T = any> = {
  title: string;

  description?: string;

  confirmLabel?: string;
  cancelLabel?: string;

  /**
   * Permet d’injecter un contenu custom (input, select, etc.)
   */
  content?: (
    value: T,
    setValue: (value: T) => void
  ) => React.ReactNode;

  /**
   * Action exécutée au confirm
   */
  onConfirm: (value: T) => Promise<void> | void;
};

export function ConfirmPanel({ context }: Props) {

  const { overlay, setOverlay, closeRight } = useRightPanel();



  const options = 
    overlay?.type === "confirm"
      ? (overlay.data as ConfirmOptions<any>)
      : null;

  const [value, setValue] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!options) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await options.onConfirm(value);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        closeRight();
        // setInfoContext(null); // 🔥 source unique
        setOverlay(null);
        setSuccess(false);
        setValue(null);
      }, 1200);

    } catch (e) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    closeRight();
    // setInfoContext(null);
    setOverlay(null);
    setValue(null);
  };

  return (
    <div className="p-5 confirm-panel shadow-xl rounded-xl w-full">
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
          {options.confirmLabel ?? "Confirmer"}
        </AnimatedButton>
      </div>
    </div>
  );
}