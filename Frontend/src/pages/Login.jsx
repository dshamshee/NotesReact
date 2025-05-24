import { useState } from "react";
import { login } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useToastConfig } from "../utils/toastConfig";
import { useMedia } from "react-use";

export const Login = () => {
  const navigate = useNavigate();
  const isDark = useMedia("(prefers-color-scheme: dark)", false);
  const toastConfig = useToastConfig();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);
      if (res.status === 200) {
        // Set cookies with minimal restrictions for local development
        Cookies.set("token", res.data.token, {
          expires: 7,
          path: '/',
          sameSite: 'none',
          secure: false
        });
        Cookies.set("id", res.data.id, {
          expires: 7,
          path: '/',
          sameSite: 'none',
          secure: false
        });

        // Also store in localStorage as backup
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);
        
        toast.success("Login Successfully", toastConfig);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Login failed", toastConfig);
    }
  };

  return (
    <div className="mainContainer flex justify-center items-center h-screen">
      <div className="innerContainer w-[20%] h-auto max-auto">
        <h1 className="text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Not</span>
          <span className={`${isDark ? "text-success" : "text-pink-500"}`}>ify</span>
        </h1>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button onClick={handleLogin} className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-hover text-primary">
            {" "}
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};
