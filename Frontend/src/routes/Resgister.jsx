import { Form } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const loginData = { email, password };
  const url = `${import.meta.env.VITE_FASTAPI_URL}/register`;

  const addUser = async (data) => {
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
    return { data };
  };
  const result = await addUser(loginData);
  return result;
};
const Register = () => {
  return (
    <Form method="POST">
      <label>
        Email
        <input type="text" name="email" />
      </label>
      <label>
        Password
        <input type="text" name="password" />
      </label>
      <button type="submit">Add New User</button>
    </Form>
  );
};
export default Register;
