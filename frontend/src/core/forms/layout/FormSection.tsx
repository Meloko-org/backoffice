import type { ApiError } from "../../../types/global.types";

type FormSectionProps = {
	title: string;
  children: React.ReactNode;
  globalError?: ApiError;
}

export default function FormSection({
  title,
  children,
  globalError,
}: FormSectionProps) {
	
  return (
    <div className={`
      form-section  
      ${globalError ? "border-red-400" : ""}
    `}>

      <div className="p-5 space-y-4">
        {title && (
          <h2 className="text-lg font-semibold">
            {title}
          </h2>
        )}

        <div className="space-y-4">
          {children}
        </div>
      </div>

      {globalError && (
				<div className="bg-danger rounded-b-lg border border-danger/0 border-t-danger p-3 text-sm text-white">
					{globalError.message}
          {globalError.fieldErrors && (
            <ul className="list-disc list-inside text-xs text-white">
              {Object.entries(globalError.fieldErrors).map(([field, message]) => (
                <li key={field}>
                  <span className="font-medium">{field}</span> : {message}
                </li>
              ))}
            </ul>
          )}
				</div>
			)}

    </div>
  );
}
