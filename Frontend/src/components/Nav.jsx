import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const Nav = ({ navItems }) => {
  return (
    <nav>
      <ul className="flex  gap-16">
        {navItems.map((link, index) => {
          return (
            <li key={`${link.title}-${index}`}>
              <Link to={link.url}>{link.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  navItems: PropTypes.array,
};

export default Nav;
