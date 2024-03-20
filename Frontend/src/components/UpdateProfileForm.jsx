import { useState } from "react";

const UpdateProfileForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ email, name, bio }),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update/profile/${user_id}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      setError("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h2 className="text-2xl text-gray-700 mb-5">Update Profile</h2>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-72 p-5 bg-white rounded shadow-md"
      >
        <label className="font-semibold mb-2">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-2 border rounded border-gray-300"
        />
        <label className="font-semibold mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 border rounded border-gray-300"
        />
        <label className="font-semibold mb-2">Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="p-2 mb-2 border rounded border-gray-300"
        />
        <button
          type="submit"
          className="p-2 mt-5 rounded bg-green-500 text-white"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
