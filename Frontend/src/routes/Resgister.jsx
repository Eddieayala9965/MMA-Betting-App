import { Form, redirect, Link } from "react-router-dom";

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
    if (response.ok) {
      window.alert("Registerd Succesful");
      return true;
    } else {
      window.alert("Registration Failed");
      return false;
    }
  };

  const register = await addUser(loginData);
  return register ? redirect("/") : redirect("/register");
};

const Register = () => {
  return (
    <>
      <div className="flex justify-center align-center h-screen">
        <div className="flex flex-1 flex-col justify-center items-center background-img h-screen scale-90 transform gap-10 text-center bg-gray-200 shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to GPTFightChat!</h1>
          <p className="text-xl mb-2">Join our MMA prediction community.</p>
          <p className="text-base mb-4">
            Powered by ChatGPT, get ready to step up your game.
          </p>
          <p className="text-base">
            Please enter your email and create a password to get started.
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center gap-10 ">
          <h1>CREATE YOUR ACCOUNT</h1>
          <p></p>
          <Form className="flex flex-col gap-10" method="POST">
            <label>
              <span className="text-grey-700">Email</span>
              <input
                className="mt-1 block w-[500px] h-8 rounded-md border-gray-800 shadow-md"
                type="text"
                placeholder="email@example.com"
                name="email"
              />
            </label>
            <label>
              <span className="text-grey-700">Password</span>
              <input
                className="mt-1 w-[500px] block h-8 rounded-md border-gray-800 shadow-md"
                type="text"
                name="password"
              />
            </label>
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              type="submit"
            >
              Add New User
            </button>
          </Form>
          <p className="flex ">
            already have an account?
            <Link className="active:text-white hover:text-blue-500" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;
