import { useState } from "react";
import { nweUser } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useToastConfig } from "../utils/toastConfig";
import { useMedia } from "react-use";

export const Signup = () => {
  const navigate = useNavigate();
  const isDark = useMedia("(prefers-color-scheme: dark)", false);
  const toastConfig = useToastConfig();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: {},
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setSignupData({
        ...signupData,
        [e.target.name]: file,
      });
    } else {
      setSignupData({
        ...signupData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", signupData.name);
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("avatar", signupData.avatar);

      const res = await nweUser(formData);
      if (res.status === 201) {
        toast.success("Signup Successfully", toastConfig);
        // Set cookies with minimal restrictions for local development
        Cookies.set('token', res.data.token, { 
          expires: 7,
          path: '/',
          sameSite: 'none',
          secure: false
        });
        Cookies.set('id', res.data.id, {
          expires: 7,
          path: '/',
          sameSite: 'none',
          secure: false
        });

        // Also store in localStorage as backup
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);

        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed", toastConfig);
    }
  };

  return (
    <div className="mainContainer flex justify-center items-center h-screen">
      <div className="innerContainer w-[20%] h-auto max-auto">
        <h1 className="text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Not</span>
          <span className={`${isDark ? "text-success" : "text-pink-500"}`}>ify</span>
        </h1>
        <p className="text-center">Create your account to continue</p>
        <form action="" encType="multipart/form-data">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              onChange={handleInputChange}
            />
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
            <label className="label">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="input"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />

            <label htmlFor="avatar">Avatar</label>
            <input
              name="avatar"
              type="file"
              className="input"
              placeholder="Avatar"
              onChange={handleInputChange}
            />
            <button onClick={handleSignup} className="btn btn-neutral mt-4 w-full">
              Signup
            </button>
          </fieldset>
          <p className="text-center mt-4">Already have an account? <Link to="/login" className="link link-hover text-primary">Login</Link></p>
        </form>
      </div>
    </div>
  );
};
