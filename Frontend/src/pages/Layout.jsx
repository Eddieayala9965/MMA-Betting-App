import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = ({ className }) => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== "/login") {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const primaryNav = [
    { title: "Home", url: "/" },
    ...(isLoggedIn
      ? [
          { title: "Odds", url: "/odds" },
          { title: "The CageSage", url: "/ai" },
          { title: "User", url: "/user" },
        ]
      : [{ title: "Login", url: "/login" }]),
  ];

  return (
    <>
      <div className={`flex flex-col min-h-screen$`}>
        <div className="flex justify-center text-center items-center gap-14">
          <Nav navItems={primaryNav}></Nav>
        </div>

        <Outlet className={`flex-grow`} />
      </div>
    </>
  );
};

export default Layout;
