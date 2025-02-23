import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const AppointmentList = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState();
  const [totalResult, setTotalresult] = useState();
  const [tableLoader, setTableLoader] = useState(false);
  const from = page * limit - limit + 1;
  const to = totalPages === page ? totalResult : limit * page;

  const getAppointmentDetail = async () => {
    try {
      setTableLoader(true);
      const response = await axios.get("/user/getBill");
      if (response) {
        setAppointmentList(response.data.payload);
        setTableLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setTableLoader(false);
    }
  };

  const updateStatus = async (status, id) => {
    try {
      const response = await axios.put(`/user/bill/${id}`, {
        status,
      });
      if (response) {
        toast.success("status updated successfully");
        getAppointmentDetail();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointmentDetail();
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
        <h3 className="page-title"> Appointments </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Appointment List
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Appointments
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Appointment List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Biller Name</th>
                      <th>Customer Name</th>
                      <th>Payment Method</th>
                      <th>Table No.</th>
                      <th>Bill Date</th>
                      <th>Total Bill</th>
                      <th>Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentList &&
                      appointmentList.length > 0 &&
                      appointmentList.map((c, index) => {
                        return (
                          <tr key={index}>
                            <td>{c.biller_name} </td>
                            <td>{c.client_name || ""}</td>
                            <td>{c.payment_type || ""}</td>
                            <td>{c.table_no || ""}</td>
                            <td>{c.createdAt ? moment(c.createdAt).format("DD-MM-YYYY") : ""}</td>
                            <td>{c.bill_amount || ""}</td>
                            <td>
                              {c.payment_status === "pending" ? (
                                <span class="badge badge-warning">{c.payment_status}</span>
                              ) : c.payment_status === "cancelled" ? (
                                <span class="badge badge-danger">{c.payment_status}</span>
                              ) : (
                                <span class="badge badge-success">{c.payment_status}</span>
                              )}
                            </td>
                            <td>
                              <select
                                value={c.payment_status}
                                onChange={(e) => updateStatus(e.target.value, c._id)}
                              >
                                <option value={"pending"}>Pending</option>
                                <option value={"completed"}>Completed</option>
                              </select>
                            </td>
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
                          page === 1 ? "page-item prev-btn disabled" : "page-item prev-btn"
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

export default AppointmentList;
