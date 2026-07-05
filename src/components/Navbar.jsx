import { Link, useNavigate } from "react-router-dom";
import { removeCookie } from "../utils/cookies";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeCookie("jwt_token");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" aria-label="Go to dashboard home" className="brand-link">
          Go Business
        </Link>

        <nav aria-label="Primary" className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
