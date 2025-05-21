export const Header = () => {
  return (
    <div className="mainContainer border border-gray-800">
      <div className="innerContainer w-[70%] mx-auto flex justify-between px-10 py-2">
        <div className="logo">
          <h1 className="text-lg font-bold">
            <span className="text-blue-500">Not</span>
            <span className="text-green-500">ify</span>
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
        <div className="profile">
          <button className="btn btn-warning btn-xs font-bold">LogOut</button>
        </div>
      </div>
    </div>
  );
};
