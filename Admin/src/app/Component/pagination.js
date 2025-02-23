import React, { useState } from "react";

const PaginatedList = ({ data }) => {
  console.log("data", data);
  const from = page * limit - limit + 1;
  const to = totalPages === page ? totalResult : limit * page;


  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-12 col-sm-12 mt-5">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-items-center">
          <li
            className={
              page === 1 ? "page-item prev-btn disabled" : "page-item prev-btn"
            }
          >
            <a
              className="page-link prev-btn"
              aria-disabled={page === 1 ? true : false}
              onClick={() => onPrev()}
              role="buton"
            >
              Previous{" "}
            </a>
          </li>

          <li className="page-item flex align-items-center ml-3 mr-3">
            <span>
              Showing {from} to {to} of {totalResult} entries
            </span>
          </li>
          <li
            className={
              totalResult === from
                ? "page-item next-btn disabled"
                : "page-item next-btn "
            }
            onClick={() => onNext()}
          >
            <a className="page-link next-btn" role="buton">
              {" "}
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginatedList;
