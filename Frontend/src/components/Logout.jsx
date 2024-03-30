import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // Determine if user is logged in based on the presence of an access token
  const isLoggedIn = !!localStorage.getItem("access_token");

  // Redirect to login page immediately if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_FASTAPI_URL}/logout/`;
      const access_token = localStorage.getItem("access_token");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Problem logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="inline-block px-4 py-2 text-lg hover:bg-gray-700 active:bg-blue-500 rounded transition-colors duration-200">
      {isLoading ? (
        <p>Logging out...</p>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Logout;
