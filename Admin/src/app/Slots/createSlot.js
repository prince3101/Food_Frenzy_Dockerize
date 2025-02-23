import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

export const AddEmployeeSlot = () => {
  const [formData, setFormData] = useState({});
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [error, setError] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useHistory();
  const duration = [
    { label: "15", value: 15 },
    { label: "30", value: 30 },
    { label: "45", value: 45 },
    { label: "60 (1 Hour)", value: 60 },
    { label: "75 (1 Hour 15 Minute)", value: 75 },
    { label: "90 (1 Hour 30 Minute)", value: 90 },
    { label: "115 (1 Hour 45 Minute)", value: 115 },
    { label: "120 (2 Hour)", value: 120 },
  ];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getEmployee = async () => {
    try {
      const response = await axios.get("/admin/employ?pagination=false");

      if (response.data) {
        const employee = response.data.payload;
        const empArr = [];
        if (employee.length > 0) {
          employee.map((item) => {
            empArr.push({
              label: `${item.first_name} ${item.last_name}`,
              value: item._id,
            });
          });
        }
        setEmployeeOptions(empArr);
      }
    } catch (error) {
      console.log("error", error);
      setEmployeeOptions([]);
    }
  };

  const CreateSlot = async () => {
    try {
      if (!validate()) {
        setBtnLoader(true);
        const response = await axios.post("/admin/create-slot", formData);
        if (response) {
          setBtnLoader(false);
          toast.success(response.data.message);
          setFormData({});
          navigate.push("/slots");
        }
      }
    } catch (error) {
      if (error.response) {
        setBtnLoader(false);
        toast.error(error.response.data.message);
        setFormData({});
      }
    }
  };

  const validate = () => {
    let Error = false;
    let errors = {};
    const { employId, date, startTime, endTime, duration } = formData;
    if (!employId) {
      errors = { ...errors, employId: "Select the employ" };
      Error = true;
    } else {
      errors = { ...errors, employId: "" };
      Error = false;
    }
    if (!date) {
      errors = { ...errors, date: "Select the date" };
      Error = true;
    } else {
      errors = { ...errors, date: "" };
      Error = false;
    }
    if (!startTime) {
      errors = { ...errors, startTime: "Select the start time" };
      Error = true;
    } else {
      errors = { ...errors, startTime: "" };
      Error = false;
    }
    if (!endTime) {
      errors = { ...errors, endTime: "Select the end time" };
      Error = true;
    } else {
      errors = { ...errors, endTime: "" };
      Error = false;
    }
    if (!duration) {
      errors = { ...errors, duration: "Select the duration" };
      Error = true;
    } else {
      errors = { ...errors, duration: "" };
      Error = false;
    }

    setError(errors);
    return Error;
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Employee Slots</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Employee Slots
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Employee Slots
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Add Employee Slots</h1>
              <form className="forms-sample">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-12">
                    <Form.Group>
                      <label htmlFor="exampleInputCategory">
                        Employee <span style={{ color: "#ED4337" }}>*</span>
                      </label>
                      <Select
                        placeholder="Select Employee"
                        options={employeeOptions}
                        onChange={(value) =>
                          handleChange("employId", value.value)
                        }
                        value={
                          employeeOptions.find(
                            (f) => f.value === formData.employId
                          ) || ""
                        }
                      ></Select>
                      {error.employId && (
                        <p style={{ color: "#ED4337" }}>{error.employId}</p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6 col-lg-6 col-12">
                    <Form.Group>
                      <label htmlFor="exampleInputCarName">
                        Date <span style={{ color: "#ED4337" }}>*</span>
                      </label>
                      <Form.Control
                        type="date"
                        id="exampleInputServiceName"
                        placeholder="Select Date"
                        onChange={(e) => handleChange("date", e.target.value)}
                        value={formData.date}
                        size="md"
                      />
                      {error.date && (
                        <p style={{ color: "#ED4337" }}>{error.date}</p>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-12">
                    <Form.Group>
                      <label htmlFor="exampleInputCarName">
                        Start Time <span style={{ color: "#ED4337" }}>*</span>
                      </label>
                      <Form.Control
                        type="time"
                        id="exampleInputServiceName"
                        onChange={(e) =>
                          handleChange("startTime", e.target.value)
                        }
                        value={formData.startTime}
                        placeholder="Select Date"
                        size="md"
                      />
                      {error.startTime && (
                        <p style={{ color: "#ED4337" }}>{error.startTime}</p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6 col-lg-6 col-12">
                    <Form.Group>
                      <label htmlFor="exampleInputCarName">
                        End Time <span style={{ color: "#ED4337" }}>*</span>
                      </label>
                      <Form.Control
                        type="time"
                        id="exampleInputServiceName"
                        onChange={(e) =>
                          handleChange("endTime", e.target.value)
                        }
                        value={formData.endTime}
                        placeholder="Select Date"
                        size="md"
                      />
                      {error.endTime && (
                        <p style={{ color: "#ED4337" }}>{error.endTime}</p>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <Form.Group>
                  <label htmlFor="exampleInputCategory">
                    Duration ( In Minute ){" "}
                    <span style={{ color: "#ED4337" }}>*</span>
                  </label>
                  <Select
                    placeholder="Select Duration"
                    options={duration}
                    onChange={(value) => handleChange("duration", value.value)}
                    value={
                      duration.find((f) => f.value === formData.duration) || ""
                    }
                  ></Select>
                  {error.duration && (
                    <p style={{ color: "#ED4337" }}>{error.duration}</p>
                  )}
                </Form.Group>
                <button
                  type="button"
                  className="btn btn-dark mr-2"
                  onClick={() => CreateSlot()}
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
                <button className="btn btn-dark">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeSlot;
