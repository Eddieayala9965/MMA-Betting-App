import { useLoaderData } from "react-router-dom";
import UpdateProfileForm from "../components/UpdateProfileForm";
import ChatLog from "../components/ChatLog";

export const loader = async () => {
  const url = "http://127.0.0.1:8000/user";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const response = await fetch(url, options);
  const user = await response.json();
  console.log(user.data);
  return { user: user.data };
};

const UserPage = () => {
  const { user } = useLoaderData();
  return (
    <div className="flex items-center gap-10 justify-center min-h-screen bg-gray-200">
      {user.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col w-72 p-5 mb-5 bg-white rounded shadow-md"
          >
            <h1 className="text-xl font-semibold mb-2">User Info</h1>
            <div className=" flex flex-col">
              <p className="mb-2">
                <strong className="font-semibold">Email:</strong> {item.email}
              </p>
              <p className="mb-2">
                <strong className="font-semibold">Name:</strong> {item.name}
              </p>
              <p className="mb-2">
                <strong className="font-semibold">Bio:</strong> {item.bio}
              </p>
            </div>
          </div>
        );
      })}
      <UpdateProfileForm />
    </div>
  );
};

export default UserPage;
