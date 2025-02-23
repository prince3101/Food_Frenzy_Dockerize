import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader/Loader";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);

  const getCategoryDetail = async () => {
    setTableLoader(true);
    try {
      const response = await axios.get(
        "/admin/category"
      );
      if (response) {
        setCategoryList(response.data.payload);
        setTableLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setTableLoader(false);
    }
  };

  const onDelete = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const DeleteCategoty = async () => {
    try {
      setBtnLoader(true);
      const respone = await axios.delete(`/admin/category-delete/${deleteId}`);
      if (respone) {
        setBtnLoader(false);
        getCategoryDetail();
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

  useEffect(() => {
    getCategoryDetail();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Category </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Category List
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Category
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <NavLink to="/add-category">
                <button className="btn btn-primary float-right">
                  Add Category{" "}
                </button>
              </NavLink>
              <h4 className="card-title">Category List</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList &&
                      categoryList.length > 0 &&
                      categoryList.map((c, index) => {
                        return (
                          <tr key={index}>
                            <td width="33%">{c.name || ""}</td>
                            <td width="33%">
                              <div style={{ whiteSpace: "break-spaces" }}>
                                {c.description || "-"}
                              </div>
                            </td>
                            <td width="33%">
                              <NavLink to={`category/${c._id}`}>
                                <button className="btn btn-success">
                                  {" "}
                                  Edit{" "}
                                </button>
                              </NavLink>
                              <button
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
            </div>
            {tableLoader === true && <Loader />}
          </div>
        </div>
      </div>

      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "red" }}>
          Are You Sure , You want to delete category ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => DeleteCategoty()}>
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

export default CategoryList;
