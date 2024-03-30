import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = ({ className }) => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
      navigate("/login");
    } else if (window.location.pathname === "/login") {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]);

  const primaryNav = [
    { title: "Home", url: "/" },
    { title: "The CageSage", url: "/ai" },
    { title: "Odds", url: "/odds" },
    ...(isLoggedIn
      ? [{ title: "User", url: "/user" }]
      : [{ title: "Login", url: "/login" }]),
  ];

  return (
    <>
      <div className={`flex flex-col min-h-screen${className}`}>
        <div className="flex justify-center text-center items-center gap-14">
          <Nav navItems={primaryNav}></Nav>
        </div>

        <Outlet className={`flex-grow`} />
      </div>
    </>
  );
};
export default Layout;
