import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {

  const navigate = useNavigate();

  return (
    <div className="hero-section">

      <div className="hero-content">
        <h1>Plan Smart. Travel Better.</h1>

        <p>
          Your AI-powered travel companion that creates personalized
          itineraries based on your budget, destination, and travel style.
        </p>

        <button
          className="hero-btn"
          onClick={() => navigate("/planner")}
        >
          Start AI Planning →
        </button>
      </div>

    </div>
  );
}