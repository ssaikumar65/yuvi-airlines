import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(null);
    navigate("/");
  };

  return (
    <nav
      style={{ padding: "12px 64px", justifyContent: "space-between" }}
      className="navbar navbar-expand-lg navbar-light bg-custom"
    >
      <Link to={"/"} className="navbar-brand">
        Yuvi Airlines
      </Link>

      {user && !user.isAdmin ? (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/viewFlights">
              View and Book Flight
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/viewBookings">
              View Bookings
            </Link>
          </li>
        </ul>
      ) : null}

      {user ? (
        <ul
          style={{ alignItems: "center", gap: "12px" }}
          className="navbar-nav"
        >
          <li
            className="nav-item"
            style={{ fontWeight: "600", marginRight: "12px" }}
          >
            Welcome {user.name}!
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <Link className="nav-link" to="/admin">
          <button className="btn btn-primary">Admin</button>
        </Link>
      )}
    </nav>
  );
};

export default Header;
