import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Nav = ({ navItems, logOut }) => {
  return (
    <nav className="flex justify-between bg-gray-900 text-white w-screen px-5 xl:px-12 py-6">
      <div className="flex w-full items-center">
        <div className="flex align-center">
          <img className="h-16 w-16" src="../img/robot3.png" alt="robo" />
          <span> MMAChatGPT</span>
        </div>
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          {navItems.map((link, index) => (
            <li key={`${link.title}-${index}`}>
              <Link to={link.url} className="hover:text-gray-200">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden xl:flex item-center space-x-5 item-center">
          <Logout />
        </div>
      </div>
      <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
    </nav>
  );
};

Nav.propTypes = {
  navItems: PropTypes.array,
};

export default Nav;
