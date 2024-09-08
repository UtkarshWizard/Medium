import { SignupType } from "@utkarshiitm/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const AuthCard = ({ type }: { type: "Sign Up" | "Sign In" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${
          type === "Sign Up" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("token", "Bearer " + jwt);
      navigate("/blogs");
    } catch (e) {
      setError(`${type === 'Sign In' ? "User Does Not Exist. Please Sign Up." : "User Already Exists / Wrong Inputs."}`);
    }
  }

  return (
    <div className="auth-card-container">
      {/* Conditionally render the error message if error state is set */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Holy smokes! </strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setError(null)} // Option to close the error message
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center px-16">
          <div>
            <div className="text-center px-10">
              <div className="sm:text-3xl font-extrabold text-xl">
                {type === "Sign Up"
                  ? "Create an Account"
                  : "Log in to Your Account"}
              </div>
              <div className="text-slate-500">
                {type === "Sign Up"
                  ? "Already have an Account ? "
                  : "Create New Account - "}
                {type === "Sign Up" ? (
                  <Link
                    to={"/signin"}
                    className="underline underline-offset-2 font-medium"
                  >
                    {" "}
                    {"Log In"}
                  </Link>
                ) : (
                  <Link
                    to={"/signup"}
                    className="underline underline-offset-2 font-medium"
                  >
                    {" "}
                    {"Sign Up"}
                  </Link>
                )}
              </div>
            </div>
            <div className="pt-4">
              {type === "Sign Up" ? (
                <InputBox
                  label="Name"
                  placeholder="Enter your Name"
                  onChange={(e) => {
                    setPostInputs((c) => ({
                      ...c,
                      name: e.target.value,
                    }));
                  }}
                />
              ) : null}
              <InputBox
                label="Email"
                placeholder="Enter your Email"
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    email: e.target.value,
                  }));
                }}
              />
              <InputBox
                label="Password"
                placeholder="Enter your Password"
                type={"password"}
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
              />
              <button
                onClick={sendRequest}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-6 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
              >
                {type === "Sign Up" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface labelInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputBox({ label, placeholder, onChange, type }: labelInput) {
  return (
    <div className="pt-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
