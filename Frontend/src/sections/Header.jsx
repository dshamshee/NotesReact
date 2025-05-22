import { useMedia } from 'react-use'; 

export const Header = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)', false);
  let navBorder = isDark ? "border-gray-800" : "border-white";
  return (
    <div className={`mainContainer`}>
      <div className={`innerContainer mt-2 w-[90%]  mx-auto flex justify-between px-10 py-2
        ${isDark ? "rounded-full shadow shadow-gray-600" : "rounded-full shadow shadow-gray-200"}
        `}>
        <div className="logo">
          <h1 className="text-lg font-bold">
            <span className="text-blue-500">Not</span>
            <span className={`${isDark ? "text-green-500" : "text-pink-500"}`}>ify</span>
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
          <button className="btn btn-warning btn-xs font-bold">LogOut</button>
          {/* <label className="swap swap-rotate"> */}
            <input
              type="checkbox"
              className="toggle theme-controller"
              // checked={theme === 'dark'}
            />
            {/* <span className="text-xs ml-2">{theme === 'dark' ? '🌙' : '☀️'}</span> */}
          {/* </label> */}
        </div>
      </div>
    </div>
  );
};
