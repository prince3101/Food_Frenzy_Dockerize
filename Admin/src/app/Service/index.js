import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import { Button, Spinner } from "react-bootstrap";
import Loader from "../Loader/Loader";

const CarLists = () => {
  const [serviceList, setServiceList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState();
  const [totalResult, setTotalresult] = useState();
  const from = page * limit - limit + 1;
  const to = totalPages === page ? totalResult : limit * page;

  const getServiceDetail = async () => {
    try {
      setTableLoader(true);
      const response = await axios.get(
        "adminIn/inventory"
      );
      if (response) {
        setServiceList(response.data.payload);
        setTableLoader(false);

      }
    } catch (error) {
      setTableLoader(false);

      console.log("error", error);
    }
  };

  

  const onDelete = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const DeleteService = async () => {
    try {
      setBtnLoader(true);
      const respone = await axios.delete(`/adminIn/inventory-delete/${deleteId}`);
      if (respone) {
        setBtnLoader(false);
        getServiceDetail();
        setDeleteId("");
        setDeleteModal(false);
        toast.success(respone.data.message);
      }
    } catch (error) {
      if (error.response) {
        setBtnLoader(false);
        setDeleteId("");
        setDeleteModal(false);
      }
    }
  };

  const handleClose = () => setDeleteModal(false);

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrev = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    getServiceDetail();
  }, [page]);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Inventory View </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Inventory List
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Inventory
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <NavLink to="/add-service">
                <button className="btn btn-primary float-right">
                  {" "}
                  Add Inventory{" "}
                </button>
              </NavLink>
              <h4 className="card-title">Inventory List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Catogory</th>
                      <th>Price (£)</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceList &&
                      serviceList.length > 0 &&
                      serviceList.map((c, index) => {
                        return (
                          <tr key={index}>
                            <td>{c.name || ""}</td>
                            <td>{c.category_id.name || ""}</td>
                            <td>{c.price || ""}</td>
                            <td>
                              <div style={{ whiteSpace: "break-spaces" }}>
                                {c.description || "-"}
                              </div>
                            </td>
                            <td>
                              <NavLink to={`edit-service/${c._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                >
                                  {" "}
                                  Edit{" "}
                                </button>
                              </NavLink>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => onDelete(c._id)}
                              >
                                Delete
                              </button>
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

      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "red" }}>
          Are You Sure , You want to delete employee ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => DeleteService()}>
            {btnLoader === true ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Ok"
            )}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CarLists;
