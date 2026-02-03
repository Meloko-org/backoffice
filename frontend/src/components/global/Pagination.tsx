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
    <div style={{ marginTop: 16 }}>
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Précédent
      </button>

      <span style={{ margin: "0 8px" }} className="text-black">
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Suivant
      </button>
    </div>
  );
};
