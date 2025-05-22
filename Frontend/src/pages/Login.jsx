import { useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const Login = () => {
  const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const res = await login(loginData);
          if(res.status === 200){
            // Set cookies with appropriate options
            Cookies.set('token', res.data.token, { 
              expires: 7, // Cookie expires in 7 days
              secure: true, // Only sent over HTTPS
              sameSite: 'strict' // Protect against CSRF
            });
            Cookies.set('email', res.data.email);
            Cookies.set('id', res.data.id);
            navigate('/');
          }
        } catch (error) {
          console.log(error.response.data);
        }
    }

  return (
    <div className="mainContainer flex justify-center items-center h-screen">
      <div className="innerContainer w-[20%] h-auto max-auto">
        <h1 className="text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Not</span>
          <span className="text-success">ify</span>
        </h1>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" onChange={handleInputChange} />
            <label className="label">Password</label>
            <input name="password" type="password" className="input" placeholder="Password" onChange={handleInputChange} />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
