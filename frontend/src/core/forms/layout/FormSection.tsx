import type { ApiError, ApiWarning } from "../../../types/global.types";

type FormSectionProps = {
	title: string;
  children: React.ReactNode;
  globalError?: ApiError;
  globalWarnings?: ApiWarning[];
  isAlertContainer?: boolean;
}

export default function FormSection({
  title,
  children,
  globalError,
  globalWarnings,
  isAlertContainer,
}: FormSectionProps) {

	
  return (
    <div className={`
      form-section  
      ${isAlertContainer && globalError ? "border-danger" : ""}
      ${isAlertContainer && globalWarnings?.length ? "border-warning" : ""}
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

      {isAlertContainer && globalError && (
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

      {isAlertContainer && globalWarnings && globalWarnings?.length > 0 && (
        <div className="bg-warning rounded-b-lg border border-warning/0 border-t-warning p-3 text-sm text-black">
          {globalWarnings.map((warning, index) => (
            <div key={index}>{warning.message}</div>
          ))}
        </div>
      )}

    </div>
  );
}
