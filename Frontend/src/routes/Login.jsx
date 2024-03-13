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
    <Form method="POST">
      <label>
        Username
        <input type="text" name="email" />
      </label>
      <label>
        Password
        <input type="text" name="password" />
      </label>
      <button type="submit">Login</button>
    </Form>
  );
};
export default Login;
