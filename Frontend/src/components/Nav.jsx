import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Nav = ({ navItems, logOut }) => {
  return (
    <nav className="bg-gray-800 text-white p-2 rounded-xl">
      <ul className="flex gap-4 justify-center">
        {navItems.map((link, index) => (
          <li key={`${link.title}-${index}`} className="list-none">
            <Link
              to={link.url}
              className="inline-block px-4 py-2 text-lg hover:bg-gray-700 active:bg-blue-500 rounded transition-colors duration-200"
            >
              {link.title}
            </Link>
          </li>
        ))}
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  navItems: PropTypes.array,
};

export default Nav;
