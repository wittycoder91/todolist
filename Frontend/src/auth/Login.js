import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { showWarningMsg, showErrorMsg } from "./../services/common";

const Login = ({ sethasTokenIn }) => {
  const navigate = useNavigate();
  const [curEmail, setCurEmail] = useState("");
  const [password, setPassword] = useState("");

  // Send login request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: curEmail,
          password,
        }
      );

      if (response.data.token) {
        sethasTokenIn(response.data.token);
        navigate("/");
      } else if (response.data.success && response.data.message) {
        showWarningMsg(response.data.message);
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-about1 bg-cover">
      <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-whitePrimary">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col rounded-[20px] bg-whiteThird w-[800px] p-10 my-6">
            <h1 className="text-6xl text-blackSecondary text-center">
              Todo List App
            </h1>
            <p className="text-3xl text-blackThird text-center mt-6">Sign in</p>
            <p className="text-base text-blackThird text-center mt-3">
              Enter your email and password to sign in
            </p>

            <label className="text-[18px] text-blackThird mt-4">Email</label>
            <div className="flex items-center justify-center mt-3">
              <div className="relative w-full">
                <input
                  type="email"
                  className="w-full text-sm text-blackThird px-6 py-2.5 border border-borderPrimary rounded-[10px] focus:outline-none pr-10"
                  placeholder="Enter your email"
                  value={curEmail}
                  onChange={(e) => setCurEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <label className="text-[18px] text-blackThird mt-3">Password</label>
            <div className="flex items-center justify-center mt-3">
              <div className="relative w-full">
                <input
                  type="password"
                  className="w-full text-sm text-blackThird px-6 py-2.5 border border-borderPrimary rounded-[10px] focus:outline-none pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="bottom-5 w-[275px] text-center bg-blackSecondary rounded-[40px] text-white bold text-base py-3 cursor-pointer self-center mt-4">
              Sign in
            </button>
            <Link to="/signup">
              <p className="text-center text-base text-blackSecondary mt-4 cursor-pointer">
                Dont’t have an account? <strong>Sign up</strong>
              </p>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
