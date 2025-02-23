import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const [main, setMain] = useState({
    email: "",
    password: "",
  });

  const handlePage = (e) => {
    const { name, value } = e.target;
    setMain((prev) => ({ ...prev, [name]: value }));
  };

  const loginValidation = () => {
    let error = {};
    let isError = false;

    if (!main?.email) {
      error = { ...error, email: "please enter email" };
      isError = true;
    } else {
      error = { ...error, email: "" };
    }

    if (!main?.password) {
      error = { ...error, password: "please enter password" };
      isError = true;
    } else {
      error = { ...error, password: "" };
    }

    setErrors(error);

    return isError;
  };

  const handleLoginSubmit = async() => {
    try {
      if (!loginValidation()) {
        const res = await axios.post("auth/login", main);
        const { user, token } = res?.data?.payload;
        if (user) {
          localStorage.setItem("userData", JSON.stringify(user));
          localStorage.setItem("token", token);
          history("/table");
          toast.success(res?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };

  return (
    <div className="bg-img">
      <div className="cards">
        <div className="d-flex both">
          <p className="login">Login</p>
        </div>

        <form>
          <div className="loginPage">
            <div className="logins">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={main?.email}
                onChange={handlePage}
              />
              {errors?.email && <p>{errors?.email}</p>}
              <input
                type="password"
                placeholder="password"
                name="password"
                value={main?.password}
                onChange={handlePage}
              />
              {errors?.password && <p>{errors?.password}</p>}
              <button type="button" onClick={() => handleLoginSubmit()}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
