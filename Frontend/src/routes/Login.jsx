import { Form, Link, redirect, useNavigate } from "react-router-dom";

export const action = async ({ request }) => {
  const navigate = useNavigate();
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { email, password };
  const url = `${import.meta.env.VITE_FASTAPI_URL}/login`;

  const userLogin = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    data = await response.json();
    const { session, user } = data;
    console.log(data);
    localStorage.clear();
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);
    localStorage.setItem("expires_at", session.expires_at);
    if (response.ok) {
      window.alert("Login Succesful");
      return true;
    } else {
      window.alert("Login Failed");
      return false;
    }
  };

  const loginSuccesful = await userLogin(data);
  return loginSuccesful ? redirect("/") : redirect("/login");
};
const Login = () => {
  return (
    <div className="font-[sans-serif] text-[#333] bg-white">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <Form
          className="lg:col-span-3 md:col-span-2 max-w-lg w-full p-6 mx-auto"
          method="POST"
        >
          <div className="mb-16">
            <h3 className="text-4xl font-extrabold">Sign In</h3>
            <p className="text-sm mt-6">
              Welcome back! Please log in to access your account and explore a
              world of possibilities. Your journey begins here.
            </p>
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required
            />
          </div>
          <div className="relative flex items-center mt-10">
            <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
              Password
            </label>
            <input
              name="password"
              type="Password"
              placeholder="Enter password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm">
                Remember me
              </label>
            </div>
            <div>
              <a
                href="javascript:void(0);"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <p className="text-sm mt-10 text-center">
            Dont have an account
            <Link
              to={"/register"}
              href="javascript:void(0);"
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Register here
            </Link>
          </p>
        </Form>
        <div className="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg-gradient-to-r from-blue-500 to-blue-900 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">
              Secure Authentication
            </h4>
            <p className="text-[13px] text-white mt-2">
              Log in with your registered email and password securely.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Remember Me</h4>
            <p className="text-[13px] text-white mt-2">
              Enable the Remember Me option htmlFor a seamless login experience
              in future sessions.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">
              Forgot Password?
            </h4>
            <p className="text-[13px] text-white mt-2">
              Easily recover your account by clicking on the Forgot Password?
              link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
