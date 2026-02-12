/* composant remplacé par DataTablePagination */ 

interface Props {
  page: number;
  totalPages: number;
  limit?: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onChange,
}: Props) => {
	
  if (totalPages <= 1) return null;

  return (
    <div className="table-pagination">
      <button
        className="table-pagination-btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Précédent
      </button>

      <div className="table-pagination-info ">
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
  );
};
