export const Login = () => {
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
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
