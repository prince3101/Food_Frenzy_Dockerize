import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import {useHistory} from "react-router-dom"
import Loader from "../Loader/Loader";

const SlotList = () => {
  const [slotsList, setSlotList] = useState([]);
  const navigate = useHistory()
  
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState();
  const [totalResult, setTotalresult] = useState();
  const [tableLoader, setTableLoader] = useState(false);
  const from = page * limit - limit + 1;
  const to = totalPages === page ? totalResult : limit * page;

  const getSlotDetail = async () => {
    setTableLoader(true);

    try {
      const response = await axios.get("/admin/get-slot"  + "?limit=" + limit + "&page=" + page);
      if (response) {
        setSlotList(response.data.payload.results);
        
        setTotalPages(response.data.payload.totalPages);
        setPage(response.data.payload.page);
        setLimit(response.data.payload.limit);
        setTotalresult(response.data.payload.totalResults);
        setTableLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setTableLoader(false);

    }
  };

  const DeleteEmployeeSlot = async(date, empId) => {
    try {
      const response = await axios.delete(`/admin/delete-slot/${moment(date).format("YYYY-MM-DD")}/${empId}`)
      toast.success(response.data.message)
      getSlotDetail()
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSlotDetail();
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
        <h3 className="page-title"> Employee Slots </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Employee Slot List
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Employee Slot
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <NavLink to="/add-slots">
                <button className="btn btn-primary float-right">Add Employee Slots</button>
              </NavLink>
              <h4 className="card-title">Employee Slot List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slotsList &&
                      slotsList.length > 0 ?
                      slotsList.map((c, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {c.employ.first_name} {c.employ.last_name}{" "}
                            </td>
                            <td>{c.employ.phone || ""}</td>
                            <td>{c.employ.email || ""}</td>
                            <td>{c._id ? moment(c._id).format("DD-MM-YYYY") : "" || ""}</td>
                            <td>{`${c.startTime} to ${c.endTime}` || ""}</td>
                            <button
                              className="btn btn-danger mt-2"
                              onClick={() => DeleteEmployeeSlot(c._id, c.employ._id)}
                            >
                              Delete
                            </button>
                          </tr>
                        );
                      })
                      :<h1 className="text-center p-4">No Data Found</h1>

                    }
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
            {tableLoader === true && <Loader />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotList;
