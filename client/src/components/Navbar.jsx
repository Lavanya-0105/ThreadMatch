import { Link, useNavigate } from "react-router-dom";

export default function Navbar({
  showBack = false,
  backLabel = "← Back",
  backPath = "/",
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#FDFCFA",
        borderBottom: "1px solid #E2DDD6",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "1.15rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#1A1714",
          textDecoration: "none",
        }}
      >
        Thread<span style={{ color: "#8B6914" }}>Match</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {showBack && (
          <button
            onClick={() => navigate(backPath)}
            style={{
              background: "none",
              border: "none",
              color: "#6B6560",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {backLabel}
          </button>
        )}
        {token && (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #E2DDD6",
              borderRadius: "999px",
              padding: "0.4rem 1rem",
              color: "#6B6560",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
