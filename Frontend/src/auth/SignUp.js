import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  showWarningMsg,
  showErrorMsg,
  showSuccessMsg,
} from "./../services/common";

const SignUp = () => {
  const navigate = useNavigate();
  const [curName, setCurName] = useState("");
  const [curEmail, setCurEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Send registration request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          username: curName,
          email: curEmail,
          password,
        }
      );

      // Handle successful registration
      if (response.data.user) {
        showSuccessMsg("The user has been created successfully.");
        navigate("/login");
      } else {
        showWarningMsg("The user was not created successfully.");
      }
    } catch (error) {
      showErrorMsg(error.message); // Handle errors
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-about1 bg-cover">
      <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-whitePrimary">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col rounded-[20px] bg-whiteThird w-[800px] max-h-[800px] m-8 p-10 overflow-auto custom-scrollbar">
            <h1 className="text-6xl text-blackSecondary text-center">
              Todo List App
            </h1>
            <p className="text-3xl text-blackThird text-center mt-6">Sign Up</p>
            <p className="text-base text-blackThird text-center mt-3">
              Fill out your details to sign up
            </p>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col flex-1">
                <label className="flex flex-row items-center gap-2 text-[18px] text-blackThird mt-3">
                  Name
                  <span className="text-redPrimary">*</span>
                </label>
                <input
                  type="text"
                  className="text-sm text-blackThird px-6 py-2.5 border border-borderPrimary rounded-[10px] focus:outline-none mt-3 "
                  placeholder="Enter your name"
                  value={curName}
                  onChange={(e) => setCurName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="flex flex-row items-center gap-2 text-[18px] text-blackThird mt-3">
                  Email
                  <span className="text-redPrimary">*</span>
                </label>
                <input
                  type="email"
                  className="text-sm text-blackThird px-6 py-2.5 border border-borderPrimary rounded-[10px] focus:outline-none mt-3"
                  placeholder="Enter your email address"
                  value={curEmail}
                  onChange={(e) => setCurEmail(e.target.value)}
                  required
                />
              </div>
            </section>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col flex-1">
                <label className="flex flex-row items-center gap-2  text-[18px] text-blackThird mt-3">
                  Password
                  <span className="text-redPrimary">*</span>
                </label>
                <div className="flex items-center justify-center mt-3">
                  <div className="relative w-full">
                    <input
                      type="password"
                      className="w-full  text-sm text-blackThird px-6 py-2.5 border border-borderPrimary rounded-[10px] focus:outline-none pr-10"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <label className="flex flex-row items-center gap-2  text-[18px] text-blackThird mt-3">
                  Password Confirm
                  <span className="text-redPrimary">*</span>
                </label>
                <div className="flex items-center justify-center mt-3">
                  <div className="relative w-full">
                    <input
                      type="password"
                      className="w-full  text-sm text-blackThird px-6 py-2.5 border border-borderPrimary rounded-[10px] focus:outline-none pr-10"
                      placeholder="Enter your password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
            <button
              type="submit"
              className="bottom-5 w-[275px] text-center bg-blackSecondary rounded-[40px] text-white  bold text-base py-3 cursor-pointer self-center mt-4"
            >
              Register
            </button>
            <Link
              to="/login"
              className=" text-base text-blackThird text-center mt-3"
            >
              Already have an account? <strong>Sign in</strong>
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

export default SignUp;
