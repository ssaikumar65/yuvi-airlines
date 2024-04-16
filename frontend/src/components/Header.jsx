import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    logout(null);
    navigate("/");
  };
  return (
    <nav
      style={{ padding: "12px 64px", justifyContent: "space-between" }}
      className=" navbar navbar-expand-lg navbar-light bg-custom"
    >
      <ul style={{ alignItems: "center" }} className="navbar-nav">
        <Link to={"/"} className=" navbar-brand">
          Yuvi Airlines
        </Link>
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
      {user ? (
        <ul
          style={{ alignItems: "center", gap: "12px" }}
          className="navbar-nav"
        >
          <li style={{ fontWeight: "600" }} className="nav-item">
            Welcome {user.name}!
          </li>
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </ul>
      ) : null}
    </nav>
  );
};

export default Header;
