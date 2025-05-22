import { useState } from "react";
import { nweUser } from "../utils/api";

export const Signup = () => {
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
        [e.target.name]: file
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
      formData.append('name', signupData.name);
      formData.append('email', signupData.email);
      formData.append('password', signupData.password);
      formData.append('avatar', signupData.avatar);

      const res = await nweUser(formData);
      console.log(res);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="mainContainer flex justify-center items-center h-screen">
      <div className="innerContainer w-[20%] h-auto max-auto">
        <h1 className="text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Not</span>
          <span className="text-success">ify</span>
        </h1>
        <p className="text-center">Login to your account to continue</p>
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
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button onClick={handleSignup} className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
