import React, { useState } from "react";

const DeleteBtn = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000/data");
    const data = await response.json();
    updateData(data);
  };

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
      <button
        className="rounded-lg bg-red-600 py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete Message"}
      </button>
      {error && <p>Error: {error}</p>}
      {success && <p>Message deleted successfully!</p>}
    </div>
  );
};

export default DeleteBtn;
