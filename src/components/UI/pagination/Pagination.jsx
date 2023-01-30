export const Pagination = ({pagesArray, page, changePage}) => {
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}>
          {p}
        </span>
      ))}
    </div>
  );
};
