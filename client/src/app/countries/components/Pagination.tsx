interface IPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: IPaginationProps) => {
  return (
    <div className="join">
      <button
        className="join-item btn bg-cyan-400 hover:bg-cyan-500 text-black"
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        {"<<"}
      </button>
      <button
        className="join-item btn hover:cursor-default btn-accent disabled:bg-cyan-500 disabled:text-black"
        disabled={true}
      >
        Page {page} of {totalPages}
      </button>
      <button
        className="join-item btn bg-cyan-400 hover:bg-cyan-500 text-black"
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
