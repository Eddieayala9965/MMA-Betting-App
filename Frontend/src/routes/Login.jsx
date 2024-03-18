import { Form, redirect } from "react-router-dom";
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
    console.log(data);

    if (response.ok) {
      window.alert("Login Succesful");
      return true;
    } else {
      window.alert("Login Failed");
      return false;
    }
  };

  const loginSuccesful = await userLogin(data);
  return loginSuccesful ? redirect("/") : redirect("/user/login");
};
const Login = () => {
  return (
    <div className="flex flex-col justify-center align-center bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to GPTFightChat!
      </h1>
      <Form method="POST" className="w-full">
        <label className="block mb-4">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="text"
            name="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </Form>
    </div>
  );
};
export default Login;
