import type { ApiError } from "../../types/global.types";

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
      bg-white rounded-lg shadow-sm border p-1
      ${globalError ? "border-red-400" : ""}
    `}>

      <div className="p-5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
        {children}
      </div>

      {globalError && (
				<div className="bg-red-50 rounded-b-lg border border-red-200/0 border-t-red-200 p-3 text-sm text-red-700">
					{globalError.message}
          {globalError.fieldErrors && (
            <ul className="list-disc list-inside text-xs text-red-600">
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
