import { useCallback, useRef, useState } from "react";

interface ImportDropzoneProps {
  onFileSelected: (file: File) => void;
  error?: string | null;
}

export default function ImportDropzone({
  onFileSelected,
  error,
}: ImportDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        return;
      }

      setFileName(file.name);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center
          border-2 border-dashed rounded-xl
          px-6 py-10 text-center cursor-pointer
          transition
          ${
            isDragging
              ? "border-primary-500 bg-primary-50"
              : "border-gray-300"
          }
          ${error ? "border-red-500 bg-red-50" : ""}
        `}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className="hidden"
        />

        <p className="text-sm text-gray-700 font-medium">
          Glissez votre fichier CSV ici
        </p>
        <p className="text-xs text-gray-500">
          ou cliquez pour sélectionner un fichier
        </p>

        {fileName && (
          <p className="mt-2 text-sm text-primary font-semibold">
            {fileName}
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm text-danger font-medium">{error}</p>
      )}
    </div>
  );
}
