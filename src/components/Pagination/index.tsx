import React from "react";
// import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: any;
  pages: number[];
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pages,
  onChangePage,
}) => {
  console.log("pages.length: ", pages.length);
  console.log("currentPage: ", currentPage);
  return (
    <div className={styles.root}>
      <button
        className={styles.previous}
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="30.021px"
          height="30.021px"
          viewBox="0 0 30.021 30.021"
        >
          <path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151   c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0   l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" />
        </svg>
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => onChangePage(page)}
            className={page === currentPage ? styles.active : ""}
          >
            {page}
          </button>
        );
      })}
      <button
        className={styles.next}
        disabled={currentPage === pages.length}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="30.021px"
          height="30.021px"
          viewBox="0 0 30.021 30.021"
        >
          <path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151   c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0   l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" />
        </svg>
      </button>
    </div>
  );
};
export default Pagination;
