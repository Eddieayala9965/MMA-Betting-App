import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Layout = ({ className }) => {
  const primaryNav = [
    { title: "Home", url: "/" },
    { title: "MMA ChatGPT", url: "/ai" },
    { title: "Register", url: "/register" },
    { title: "Login", url: "/login" },
    { title: "User", url: "/user" },
    { title: "ChatLog", url: "/chatlog" },
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
