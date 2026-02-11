export type Align = "start" | "center" | "end";

interface DataPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
	align: Align;
}

export const DataTablePagination = ({
  page,
  totalPages,
  onChange,
	align,
}: DataPaginationProps) => {
  if (totalPages <= 1) return null;

	const justifyClass = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
	}[align ?? "end"];

  return (
		<div className={`flex flex-row ${justifyClass} px-3`}>
			<div className="table-pagination">
				<button
					className="table-pagination-btn"
					disabled={page === 1}
					onClick={() => onChange(page - 1)}
				>
					Précédent
				</button>

				<div className="table-pagination-info">
					Page {page} / {totalPages}
				</div>

				<button
					className="table-pagination-btn"
					disabled={page === totalPages}
					onClick={() => onChange(page + 1)}
				>
					Suivant
				</button>
			</div>
		</div>
  );
};
