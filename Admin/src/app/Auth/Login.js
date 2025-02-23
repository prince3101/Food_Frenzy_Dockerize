import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoginFormValidation } from "../Component/setting";

const Login = () => {
  const [loginDetail, setLoginDetail] = useState({});
  const [error, setErrors] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);

  const onHandleChange = (name, value) => {
    setLoginDetail({ ...loginDetail, [name]: value });
  };

  const Login = async () => {
    const { isError, errors } = LoginFormValidation(loginDetail);
    setErrors(errors);
    if (!isError) {
      try {
        setBtnLoader(true);
        const response = await axios.post("/auth/login", loginDetail);
        if(response){
        const { data, token } = response.data.payload;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userData", JSON.stringify(data));
        setBtnLoader(false);
        window.location.href = "/dashboard";
        toast.success(response.data.message);
        }
      } catch (error) {
        console.log("error", error);
        setBtnLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 bg-color">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5 ">
              <div className="brand-logo">
                <img
                  src={require("../../assets/images/Logo.png")}
                  alt="logo"
                />
              </div>
              {/* <h4>Hello Gentelman!</h4> */}
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3 ">
                <Form.Group className="search-field ">
                  <Form.Control
                    type="email"
                    placeholder="Username"
                    size="lg"
                    className="h-auto"
                    onChange={(e) => onHandleChange("email", e.target.value)}
                    value={loginDetail.email || ""}
                  />
                <p className="red-color">{error.email}</p>

                </Form.Group>

                <Form.Group className="search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                    onChange={(e) => onHandleChange("password", e.target.value)}
                    value={loginDetail.password || ""}
                  />
                <p className="red-color">{error.password}</p>


                </Form.Group>

                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-block btn-dark btn-lg font-weight-medium auth-form-btn"
                    onClick={() => Login()}
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
                    "SIGN IN"
                  )}
                    
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
