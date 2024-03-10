import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
const Layout = () => {
  const primaryNav = [
    { title: "Home", url: "/" },
    { title: "Ask Your Prediction", url: "/ai" },
  ];
  return (
    <>
      <div className="flex justify-center text-center items-center ">
        <Nav navItems={primaryNav} />
      </div>
      <Outlet />
    </>
  );
};
export default Layout;
