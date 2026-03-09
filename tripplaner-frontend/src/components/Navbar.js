import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {

  const location = useLocation();

  return (
    <nav className="navbar">

      {/* LEFT LOGO */}
      <div className="logo">
        🌍 TripPlanner AI
      </div>

      {/* CENTER NAV LINKS */}
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>

        <li className={location.pathname === "/planner" ? "active" : ""}>
          <Link to="/planner">AI Planner</Link>
        </li>

        <li className={location.pathname === "/map" ? "active" : ""}>
          <Link to="/map">Map</Link>
        </li>

        <li className={location.pathname === "/services" ? "active" : ""}>
          <Link to="/services">Services</Link>
        </li>

        <li className={location.pathname === "/itineraries" ? "active" : ""}>
          <Link to="/itineraries">Itineraries</Link>
        </li>
      </ul>

      {/* RIGHT SIDE PROFILE */}
      <div className="profile">
        👤
      </div>

    </nav>
  );
}