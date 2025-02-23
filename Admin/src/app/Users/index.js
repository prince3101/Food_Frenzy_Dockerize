import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState();
  const [totalResult, setTotalresult] = useState();
  const [tableLoader, setTableLoader] = useState(false);
  const from = page * limit - limit + 1;
  const to = totalPages === page ? totalResult : limit * page;

  const getUserDetail = async () => {
    setTableLoader(true);

    try {
      const response = await axios.get(
        "/admin/users" + "?limit=" + limit + "&page=" + page
      );
      setUserList(response.data.payload.results);

      setTotalPages(response.data.payload.totalPages);
      setPage(response.data.payload.page);
      setLimit(response.data.payload.limit);
      setTotalresult(response.data.payload.totalResults);
      setTableLoader(false);
    } catch (error) {
      console.log("error", error);
      setTableLoader(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [page]);

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrev = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Users </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                User List
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Users
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">User List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList &&
                      userList.length > 0 &&
                      userList.map((c, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {c.first_name} {c.last_name}
                            </td>
                            <td>{c.email || ""}</td>
                            <td>{c.phone || ""}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {totalResult > 0 && (
                <div className="col-xl-12 col-lg-12 col-md-12 col-12 col-sm-12 mt-5">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center align-items-center">
                      <li
                        className={
                          page === 1
                            ? "page-item prev-btn disabled"
                            : "page-item prev-btn"
                        }
                      >
                        <a
                          className="page-link prev-btn"
                          aria-disabled={page === 1 ? true : false}
                          onClick={page > 1 ? () => onPrev() : null}
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
                          page === totalPages
                            ? "page-item next-btn disabled"
                            : "page-item next-btn "
                        }
                        onClick={page < totalPages ? () => onNext() : null}
                      >
                        <a className="page-link next-btn" role="buton">
                          {" "}
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
            {tableLoader === true && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
