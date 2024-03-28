import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = ({ className }) => {
  const isLoggin = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const primaryNav = [
    { title: "Home", url: "/" },
    { title: "The CageSage", url: "/ai" },
    { title: "Odds", url: "/odds" },
  ];

  if (!isLoggin) {
    primaryNav.push({ title: "Login", url: "/login" });
  }
  if (isLoggin) {
    primaryNav.push({ title: "User", url: "/user" });
  }

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
