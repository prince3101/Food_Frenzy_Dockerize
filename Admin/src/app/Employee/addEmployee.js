import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { EmployeeValidation } from "../Component/setting";

export const AddEmployee = () => {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const [error, setErrors] = useState({});

  const navigate = useHistory();
  const { id } = useParams();

  const onHandleChange = (name, value) => {
    setEmployeeDetail({ ...employeeDetail, [name]: value });
  };

  const addEmployee = async () => {
    const { isError, errors } = EmployeeValidation(employeeDetail);
    setErrors(errors);
    if (!isError) {
      try {
        setBtnLoader(true);
        let url = "/auth/sign-up";
        if (id) {
          url = `/user/${id}`;
        }
        let method = "post";
        if (id) {
          method = "put";
        }
        const response = await axios[method](url, employeeDetail);
        console.log("res", response);
        if (response) {
          setEmployeeDetail({});
          setBtnLoader(false);
          toast.success(response.data.message);

          navigate.push("/employee");
        }
      } catch (error) {
        if (error.response) {
          setBtnLoader(false);

          toast.error(error.response.data.message);
        }
      }
    }
  };

  const getEmployeeDetail = async (id) => {
    try {
      const response = await axios.get(`/admin/employ/${id}`);
      setEmployeeDetail(response.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getEmployeeDetail(id);
    }
  }, [id]);

  const clearAll = () => {
    setEmployeeDetail({});
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">{id ? "Edit" : "Add"} User</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {id ? "Edit" : "Add"} User
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-4">
                {id ? "Edit" : "Add"} User
              </h1>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputCarName">First Name</label>
                  <Form.Control
                    type="text"
                    id="exampleInputServiceName"
                    placeholder="First Name"
                    size="lg"
                    onChange={(e) =>
                      onHandleChange("first_name", e.target.value)
                    }
                    value={employeeDetail.first_name || ""}
                  />
                  <p className="red-color">{error.first_name}</p>

                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCategory">Last name</label>
                  <Form.Control
                    type="text"
                    id="exampleInputCategory"
                    placeholder="Last Name"
                    size="lg"
                    onChange={(e) =>
                      onHandleChange("last_name", e.target.value)
                    }
                    value={employeeDetail.last_name || ""}
                  />
                  <p className="red-color">{error.last_name}</p>

                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Email</label>
                  <Form.Control
                    type="email"
                    id="examplePrice"
                    placeholder="Email"
                    size="lg"
                    onChange={(e) => onHandleChange("email", e.target.value)}
                    value={employeeDetail.email || ""}
                  />
                  <p className="red-color">{error.email}</p>

                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Phone Number</label>
                  <Form.Control
                    type="number"
                    id="examplePrice"
                    placeholder="Phone Number"
                    size="lg"
                    onChange={(e) => onHandleChange("phone", e.target.value)}
                    value={employeeDetail.phone || ""}
                  />
                  <p className="red-color">{error.phone}</p>

                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Password</label>
                  <Form.Control
                    type="number"
                    id="examplePrice"
                    placeholder="Password"
                    size="lg"
                    onChange={(e) => onHandleChange("password", e.target.value)}
                    value={employeeDetail.password || ""}
                  />
                  <p className="red-color">{error.password}</p>

                </Form.Group>
                <button
                  type="button"
                  className="btn btn-dark mr-2"
                  onClick={() => addEmployee()}
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
                  className="btn btn-dark"
                  onClick={() => clearAll()}
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

export default AddEmployee;
