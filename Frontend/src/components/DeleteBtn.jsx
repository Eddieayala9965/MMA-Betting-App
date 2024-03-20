import React, { useState } from "react";

const DeleteBtn = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete message");
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete Message"}
      </button>
      {error && <p>Error: {error}</p>}
      {success && <p>Message deleted successfully!</p>}
    </div>
  );
};

export default DeleteBtn;
