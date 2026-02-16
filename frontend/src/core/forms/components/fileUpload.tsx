import { useRef, useState } from "react";
import { uploadFile } from "../../../lib/uploadFile";

type FileUploadProps = {
  label: string;
  value?: string;
  accept?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  onChange: (url: string) => void;
};

export default function FileUpload({
  label,
  value,
  accept = "image/*",
  disabled,
  error,
  required,
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(file: File) {
    try {
      setLoading(true);
      const url = await uploadFile(file);
      onChange(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm pl-3 text-neutral-500">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative w-40 h-40 border rounded overflow-hidden">
          <img
            src={value}
            alt="preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
      />

      {/* Button */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => inputRef.current?.click()}
        className="btn-outline-primary"
      >
        {loading
          ? "Upload..."
          : value
          ? "Changer l’image"
          : "Sélectionner une image"}
      </button>

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
