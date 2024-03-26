import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "./Logout";

const Nav = ({ navItems, logOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between bg-gray-900 text-white w-screen px-5 xl:px-12 py-6">
      <div className="flex w-full items-center">
        <div className="flex align-center">
          <img className="h-16 w-16" src="../img/robot3.png" alt="robo" />
          <span>The CageSage</span>
        </div>
        <ul
          className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 px-4 mx-auto font-semibold font-heading ${
            isOpen ? "block" : "hidden"
          } md:flex`}
        >
          <li className="flex flex-col sm:flex-col md:flex-row">
            {navItems.map((link, index) => (
              <Link
                key={`${link.title}-${index}`}
                to={link.url}
                className="hover:text-gray-200 md:ml-4"
              >
                {link.title}
              </Link>
            ))}
          </li>
          <li className="md:flex md:ml-4">
            <button className="hover:text-gray-200">
              <Logout />
            </button>
          </li>
        </ul>
      </div>
      <a
        className="navbar-burger self-center mr-12 xl:hidden"
        href="#"
        onClick={() => setIsOpen(!isOpen)}
      >
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
