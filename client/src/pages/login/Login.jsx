import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lNavBarContainer">
        <div className="lNavBar">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h2>Booking.com</h2>
          </Link>
          <Link to={"/register"}>
            <button className="lRegisterBtn">Register</button>
          </Link>
        </div>
      </div>
      <div className="lcontainer">
        <h1>Sign in or create an account</h1>
        <label className="lLabel" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <label className="lLabel" htmlFor="password">
          Password
        </label>

        <input
          type="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />

        <button disabled={loading} onClick={handleClick} className="lButton">
          Sign in
        </button>
        {error && <span className="lErrorMsg">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
