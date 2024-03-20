import { Form, Link, redirect } from "react-router-dom";
import { useState } from "react";

export const action = async ({ request }) => {
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
    <div class="font-[sans-serif] text-[#333] bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <Form
          class="lg:col-span-3 md:col-span-2 max-w-lg w-full p-6 mx-auto"
          method="POST"
        >
          <div class="mb-16">
            <h3 class="text-4xl font-extrabold">Sign In</h3>
            <p class="text-sm mt-6">
              Welcome back! Please log in to access your account and explore a
              world of possibilities. Your journey begins here.
            </p>
          </div>
          <div class="relative flex items-center">
            <label class="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required
            />
          </div>
          <div class="relative flex items-center mt-10">
            <label class="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">
              Password
            </label>
            <input
              name="password"
              type="Password"
              placeholder="Enter password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required
            />
          </div>
          <div class="flex items-center justify-between gap-2 mt-6">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-3 block text-sm">
                Remember me
              </label>
            </div>
            <div>
              <a
                href="javascript:void(0);"
                class="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div class="mt-10">
            <button
              type="submit"
              class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <p class="text-sm mt-10 text-center">
            Don't have an account
            <Link
              to={"/register"}
              href="javascript:void(0);"
              class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Register here
            </Link>
          </p>
        </Form>
        <div class="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg-gradient-to-r from-gray-500 to-blue-900 lg:px-8 px-4 py-4">
          <div>
            <h4 class="text-white text-lg font-semibold">
              Secure Authentication
            </h4>
            <p class="text-[13px] text-white mt-2">
              Log in with your registered email and password securely.
            </p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">Remember Me</h4>
            <p class="text-[13px] text-white mt-2">
              Enable the "Remember Me" option for a seamless login experience in
              future sessions.
            </p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">Forgot Password?</h4>
            <p class="text-[13px] text-white mt-2">
              Easily recover your account by clicking on the "Forgot Password?"
              link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

// <Form className="space-y-4 md:space-y-6" method="POST">
// <div>
//   <label
//     htmlFor="email"
//     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//   >
//     Email
//     <input
//       type="text"
//       name="email"
//       id="email"
//       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       placeholder="name@company.com"
//       required
//     />
//   </label>
// </div>
// <div></div>
// <div>
//   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//     Password
//     <input
//       type="text"
//       name="password"
//       id="password"
//       placeholder="••••••••"
//       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       required
//     />
//   </label>
// </div>
// <button
//   type="submit"
//   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
// >
//   Sign in
// </button>
// </Form>
