import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { ServiceValidation } from "../Component/setting";

export const AddService = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [isMenuChecked, setIsMenuChecked] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [error, setErrors] = useState({});
  const ItemOptions = [
    {
      label: "Available",
      value: "Available",
    },
    {
      label: "Not Available",
      value: "Not Available",
    },
  ];

  const { id } = useParams();
  const history = useHistory();

  const getCategoty = async () => {
    try {
      const response = await axios.get("/admin/category");

      if (response.data) {
        const category = response.data.payload;
        const CategotyArr = [];
        if (category.length > 0) {
          category.map((item) => {
            CategotyArr.push({ label: item.name, value: item._id });
          });
        }

        setCategoryOptions(CategotyArr);
      }
    } catch (error) {
      console.log("error", error);
      setCategoryOptions([]);
    }
  };

  useEffect(() => {
    getCategoty();
  }, []);

  const onHandleChange = (name, value) => {
    setServiceData({ ...serviceData, [name]: value });
  };

  const addService = async () => {
    const { isError, errors } = ServiceValidation(serviceData);
    setErrors(errors);
    if (!isError) {
      try {
        setBtnLoader(true);
        let url = "/adminIn/inventory/add";
        if (id) {
          url = `/adminIn/inventory/${id}`;
        }
        let method = "post";
        if (id) {
          method = "put";
        }

        let requestData = serviceData;
        requestData["is_veg"] = isMenuChecked;

        const response = await axios[method](url, requestData);
        if (response) {
          setServiceData({});
          setIsMenuChecked(false);
          setBtnLoader(false);
          toast.success(response.data.message);

          history.push("/service");
        }
      } catch (error) {
        if (error.response) {
          setBtnLoader(false);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const getServiceDetail = async (id) => {
    try {
      const response = await axios.get(`/adminIn/inventory/${id}`);
      const categoryDetail = response.data.payload;
      setServiceData({
        name: categoryDetail.name,
        price: categoryDetail.price,
        description: categoryDetail.description,
        category_id: categoryDetail.category_id,
        item: categoryDetail.item
      });
      setIsMenuChecked(categoryDetail.is_veg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getServiceDetail(id);
    }
  }, [id]);

  const clearAll = () => {
    setIsMenuChecked(false);
    setServiceData({});
  };
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">{id ? "Edit" : "Add"} Inventory</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Inventory
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {id ? "Edit" : "Add"} Inventory
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">{id ? "Edit" : "Add"} Inventory</h1>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Inventory Name</label>
                  <Form.Control
                    type="text"
                    id="exampleInputServiceName"
                    placeholder="Service Name"
                    size="lg"
                    onChange={(e) => onHandleChange("name", e.target.value)}
                    value={serviceData.name || ""}
                  />
                  <p className="red-color">{error.name}</p>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCategory">Category</label>
                  <Select
                    placeholder="Select Category"
                    options={categoryOptions}
                    onChange={(value) => onHandleChange("category_id", value.value)}
                    value={categoryOptions.find((f) => f.value === serviceData.category_id || "")}
                  ></Select>
                  <p className="red-color">{error.category_id}</p>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Price (£)</label>
                  <Form.Control
                    type="text"
                    id="examplePrice"
                    placeholder="Price"
                    size="lg"
                    onChange={(e) => onHandleChange("price", e.target.value)}
                    value={serviceData.price || ""}
                  />
                  <p className="red-color">{error.price}</p>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Inventory Description</label>
                  <Form.Control
                    type="text"
                    id="exampleInputServiceName"
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    onChange={(e) => onHandleChange("description", e.target.value)}
                    value={serviceData.description || ""}
                  />
                  <p className="red-color">{error.description}</p>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCategory">Item Available</label>
                  <Select
                    placeholder="Select Availability"
                    options={ItemOptions}
                    onChange={(value) => onHandleChange("item", value.value)}
                    value={ItemOptions.find((f) => f.value === serviceData.item || "")}
                  ></Select>
                   <p className="red-color">{error.item}</p>
                </Form.Group>
                <Form.Group>
                  <div key="inline-checkbox" className="menu-check">
                    <Form.Check
                      className="d-flex"
                      inline
                      type="checkbox"
                      id="inline-checkbx-1"
                      label="Vegetarian"
                      name="is_veg"
                      onChange={(e) => setIsMenuChecked(e.target.checked)}
                      checked={isMenuChecked}
                    ></Form.Check>
                  </div>
                </Form.Group>
                <button type="button" className="btn btn-dark mr-2" onClick={() => addService()}>
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
                <button type="button" className="btn btn-dark" onClick={() => clearAll()}>
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

export default AddService;
