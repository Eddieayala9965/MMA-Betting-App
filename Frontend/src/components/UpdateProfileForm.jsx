import { useState } from "react";

const UpdateProfileForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, bio }),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/update/profile",
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
    <div>
      <h2>Update Profile</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
