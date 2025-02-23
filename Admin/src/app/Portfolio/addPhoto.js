import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";

export const AddPhoto = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const uploadImage = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      if (formData.file.length > 0) {
        Array.from(formData.file).forEach((f, index) => {
          formdata.append(`file[${index}]`, f);
        });
      }
      formdata.append("description", formData.description || "");
      const result = await axios.post("/admin/portfolio", formdata);
      if (result) {
        toast.success(result.data.message);
        setLoading(false);
        history.push("/portfolio");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Potfolio</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Portfolio
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Photo
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Add Photo</h1>
              <form className="forms-sample">
                <Form.Group>
                  <label>File upload</label>
                  <div className="custom-file">
                    <Form.Control
                      type="file"
                      className="form-control-sm visibility-hidden"
                      id="customFileLang"
                      lang="es"
                      onChange={(e) => setFormData({ file: e.target.files })}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFileLang">
                      Upload images
                    </label>
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCarName">Image Description</label>
                  <Form.Control
                    type="text"
                    id="exampleInputServiceName"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ description: e.target.value })}
                    size="lg"
                  />
                </Form.Group>
                <button
                  type="button"
                  className="btn btn-dark mr-2"
                  disabled={loading}
                  onClick={() => uploadImage()}
                >
                  {loading === true ? (
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

export default AddPhoto;
