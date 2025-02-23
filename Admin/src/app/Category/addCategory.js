import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { CategoryValidation } from "../Component/setting";

export const AddCategory = () => {
  const [categoryDetail, setCategoryDetail] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const [error, setErrors] = useState({});

  const navigate = useHistory();
  const { id } = useParams();

  const onHandleChange = (name, value) => {
    setCategoryDetail({ ...categoryDetail, [name]: value });
  };

  const addCategory = async () => {
    const { isError, errors } = CategoryValidation(categoryDetail);
    setErrors(errors);
    if (!isError) {
      try {
        setBtnLoader(true);
        let url = "/admin/category/add";
        if (id) {
          url = `/admin/category/${id}`;
        }
        let method = "post";
        if (id) {
          method = "put";
          delete categoryDetail._id;
          delete categoryDetail.__v;
          delete categoryDetail.createdAt;
          delete categoryDetail.updatedAt;
        }
        const response = await axios[method](url, categoryDetail);
        if (response) {
          setCategoryDetail({});
          setBtnLoader(false);
          toast.success(response.data.message);

          navigate.push("/category");
        }
      } catch (error) {
        if (error.response) {
          setBtnLoader(false);

          toast.error(error.response.data.message);
        }
      }
    }
  };

  const getCategoryDetail = async (id) => {
    try {
      const response = await axios.get(`/admin/category/${id}`);
      setCategoryDetail(response.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryDetail(id);
    }
  }, [id]);

  const clearAll = () => {
    setCategoryDetail({});
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">{id ? "Edit" : "Add"} Category</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Category
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {id ? "Edit" : "Add"} Category
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-4">
                {id ? "Edit" : "Add"} Category
              </h1>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Name</label>
                  <Form.Control
                    type="text"
                    id="exampleInputServiceName"
                    placeholder="Name"
                    size="lg"
                    onChange={(e) => onHandleChange("name", e.target.value)}
                    value={categoryDetail.name || ""}
                  />
                  <p className="red-color">{error.name}</p>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCategory">Description</label>
                  <Form.Control
                    type="textarea"
                    id="exampleInputCategory"
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    onChange={(e) =>
                      onHandleChange("description", e.target.value)
                    }
                    value={categoryDetail.description || ""}
                  />
                  <p className="red-color">{error.description}</p>
                </Form.Group>
                <button
                  type="button"
                  className="btn btn-dark mr-2"
                  onClick={() => addCategory()}
                >
                  {btnLoader === true ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => clearAll()}
                  className="btn btn-dark"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
