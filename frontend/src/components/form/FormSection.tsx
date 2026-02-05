type FormSectionProps = {
	title: string;
  children: React.ReactNode;
  globalError?: string;
}

export default function FormSection({
  title,
  children,
  globalError,
}: FormSectionProps) {
	
  return (
    <div className={`
      bg-white rounded-lg shadow-sm border pl-1 pr-1 pt-1
      ${globalError ? "border-red-400" : ""}
    `}>

      <div className="p-5 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
        {children}
      </div>

      {globalError && (
				<div className="bg-red-50 border border-red-200/0 border-t-red-200 p-3 text-sm text-red-700">
					{globalError}
				</div>
			)}

    </div>
  );
}
