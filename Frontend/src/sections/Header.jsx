import { useMedia } from "react-use";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../utils/api";
import { useState, useEffect } from "react";
export const Header = () => {
  const navigate = useNavigate();
  const isDark = useMedia("(prefers-color-scheme: dark)", false);
  const [user, setUser] = useState({});

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  // console.log(user.avatar);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        // Remove cookies and localStorage items
        Cookies.remove('token', { path: '/' });
        Cookies.remove('id', { path: '/' });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.success("Logout Successfully", {theme: isDark ? "dark" : "light"});
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed", {theme: isDark ? "dark" : "light"});
    }
  };

  return (
    <div className={`mainContainer`}>
      <div
        className={`innerContainer mt-2 w-[90%]  mx-auto flex justify-between px-10 py-2
        ${
          isDark
            ? "rounded-full shadow shadow-gray-600"
            : "rounded-full shadow shadow-gray-200"
        }
        `}
      >
        <div className="logo">
          <h1 className="text-lg font-bold">
            <span className="text-blue-500">Not</span>
            <span className={`${isDark ? "text-green-500" : "text-pink-500"}`}>
              ify
            </span>
          </h1>
        </div>
        <div className="sections">
          <button
            className="btn btn-accent btn-xs font-bold"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            New Note
          </button>
        </div>
        <div className="profile flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="btn btn-warning btn-xs font-bold"
          >
            LogOut
          </button>
          {/* <p className="text-xs font-bold">{Cookies.get('id')}</p> */}
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
              <img
                src={`http://localhost:3000/images/${user.avatar}`}
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
