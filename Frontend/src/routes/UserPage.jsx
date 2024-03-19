import { useLoaderData } from "react-router-dom";
import UpdateProfileForm from "../components/UpdateProfileForm";

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
    <div>
      <h1>User Page</h1>
      {user.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.email}</p>
            <p>{item.name}</p>
            <p>{item.bio}</p>
          </div>
        );
      })}
      <UpdateProfileForm />
    </div>
  );
};

export default UserPage;
