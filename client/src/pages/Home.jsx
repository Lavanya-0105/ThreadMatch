import { useState } from "react";
import { Link } from "react-router-dom";

const ROADMAP = [
  {
    icon: "🌦️",
    title: "Live weather styling",
    desc: "Real-time weather integration — recommendations adapt to today's actual forecast automatically. No more manually selecting hot or cold.",
  },
  {
    icon: "📸",
    title: "Upload your closet",
    desc: "Optionally photograph your actual clothes. ThreadMatch identifies items and adds them to your wardrobe so you never have to pick manually again.",
  },
  {
    icon: "🌐",
    title: "Smarter style intelligence",
    desc: "Access live fashion sources — trend reports, color guides, style references — so recommendations reflect what's actually in style right now.",
  },
  {
    icon: "💰",
    title: "Budget-friendly shopping",
    desc: "When you're missing a piece to complete an outfit, ThreadMatch finds affordable options from popular retailers that match your style and budget.",
  },
];

export default function Home() {
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: "#F5F2EE",
        color: "#1A1714",
        minHeight: "100vh",
      }}
    >
      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
          background:
            "linear-gradient(to bottom, rgba(245,242,238,0.98), transparent)",
        }}
      >
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          Thread<span style={{ color: "#8B6914" }}>Match</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a
            href="#how-it-works"
            style={{
              color: "#4A4540",
              fontSize: "0.875rem",
              textDecoration: "none",
              display: window.innerWidth < 768 ? "none" : "block",
            }}
          >
            How it works
          </a>
          <a
            href="#features"
            style={{
              color: "#4A4540",
              fontSize: "0.875rem",
              textDecoration: "none",
              display: window.innerWidth < 768 ? "none" : "block",
            }}
          >
            Features
          </a>
          <button
            onClick={() => setShowRoadmap(!showRoadmap)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.4rem 1rem",
              backgroundColor: "#EDE9E3",
              border: "1px solid #333",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#8B6914",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ✦ What's coming
          </button>
          <Link
            to="/login"
            style={{
              color: "#4A4540",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
          <Link
            to="/questionnaire"
            style={{
              backgroundColor: "#1A1714",
              color: "#fff",
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── WHAT'S COMING PANEL ── */}
      {showRoadmap && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setShowRoadmap(false)}
        >
          <div
            style={{
              backgroundColor: "#FDFCFA",
              border: "1px solid #E2DDD6",
              borderRadius: "1.25rem",
              padding: "2.5rem",
              maxWidth: "680px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#8B6914",
                    margin: "0 0 0.5rem",
                  }}
                >
                  Coming Next
                </p>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: "-0.03em",
                    color: "#1A1714",
                  }}
                >
                  What's being built
                </h2>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    fontSize: "0.875rem",
                    color: "#4A4540",
                  }}
                >
                  ThreadMatch is actively developed. Here's what's coming next.
                </p>
              </div>
              <button
                onClick={() => setShowRoadmap(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4A4540",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {ROADMAP.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#F5F2EE",
                    border: "1px solid #E2DDD6",
                    borderRadius: "0.875rem",
                    padding: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {item.icon}
                  </span>
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      margin: "0 0 0.5rem",
                      color: "#1A1714",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#4A4540",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HERO — full viewport height ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Full-screen background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.35)",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(245,242,238,0.97) 45%, rgba(245,242,238,0.3) 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2.5rem",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8B6914",
              margin: "0 0 1.25rem",
            }}
          >
            AI-Powered Personal Styling
          </p>

          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: "0 0 1.5rem",
              maxWidth: "700px",
            }}
          >
            Your wardrobe.
            <br />
            <span style={{ color: "#8B6914" }}>Styled by AI.</span>
            <br />
            Every morning.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#4A4540",
              maxWidth: "460px",
              lineHeight: 1.7,
              margin: "0 0 2.5rem",
            }}
          >
            Tell us your vibe, pick what you're comfortable wearing today —
            we'll find your perfect outfit combination in seconds.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/questionnaire"
              style={{
                backgroundColor: "#1A1714",
                color: "#fff",
                padding: "0.875rem 2rem",
                borderRadius: "999px",
                fontSize: "0.95rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Get Started Free →
            </Link>
            <Link
              to="/signup"
              style={{
                color: "#4A4540",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🚀 Create an account
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem" }}>
            {[
              ["AI", "Powered"],
              ["3 Step", "Process"],
              ["Free", "Always"],
            ].map(([val, lbl]) => (
              <div key={lbl}>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#1A1714",
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#4A4540",
                    fontWeight: 500,
                    marginTop: "0.2rem",
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.375rem",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              color: "#6B6560",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #9C9488, transparent)",
            }}
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        style={{ backgroundColor: "#EFEBE5", padding: "7rem 2.5rem" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8B6914",
              margin: "0 0 1rem",
              textAlign: "center",
            }}
          >
            The Process
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: "0 0 4rem",
            }}
          >
            Three steps to your perfect outfit
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                step: "01",
                title: "Set your vibe",
                desc: "Tell us your mood, occasion, weather and body type. Takes 30 seconds.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Pick your clothes",
                desc: "Select tops, bottoms and layers you're comfortable wearing today with color options.",
                icon: "👗",
              },
              {
                step: "03",
                title: "Get AI recommendations",
                desc: "Our AI stylist ranks your best outfit combinations and explains why each works.",
                icon: "✨",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  backgroundColor: "#EDE9E3",
                  border: "1px solid #E2DDD6",
                  borderRadius: "1rem",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1.25rem",
                  }}
                >
                  <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: "#6B6560",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: "0 0 0.625rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#4A4540",
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        style={{ backgroundColor: "#F5F2EE", padding: "7rem 2.5rem" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8B6914",
              margin: "0 0 1rem",
              textAlign: "center",
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: "0 0 4rem",
            }}
          >
            Built for real styling decisions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: "🧠",
                title: "AI-powered pairing",
                desc: "Groq's LLaMA model ranks combinations by how well they match your vibe, body type and occasion.",
              },
              {
                icon: "🎨",
                title: "Color-aware matching",
                desc: "Select multiple colors per item. The AI picks the best color pairings from your choices.",
              },
              {
                icon: "⚡",
                title: "Honest recommendations",
                desc: "If a camisole doesn't suit a formal occasion, the AI says so and suggests how to adapt it.",
              },
              {
                icon: "🔒",
                title: "Secure & private",
                desc: "JWT authentication keeps your style profile private. Your data stays yours.",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#FDFCFA",
                  border: "1px solid #E8E3DC",
                  borderRadius: "0.875rem",
                  padding: "1.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {f.icon}
                </span>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    margin: "0 0 0.5rem",
                    color: "#1A1714",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#4A4540",
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          backgroundColor: "#EFEBE5",
          padding: "7rem 2.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              margin: "0 0 1.25rem",
              lineHeight: 1.1,
            }}
          >
            Stop guessing.
            <br />
            Start wearing.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#4A4540",
              margin: "0 0 2.5rem",
              lineHeight: 1.7,
            }}
          >
            ThreadMatch helps you make the most of what you already own.
          </p>
          <Link
            to="/questionnaire"
            style={{
              display: "inline-block",
              backgroundColor: "#1A1714",
              color: "#fff",
              padding: "1rem 2.5rem",
              borderRadius: "999px",
              fontSize: "1rem",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: "#F5F2EE",
          borderTop: "1px solid #E2DDD6",
          padding: "2rem 2.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Thread<span style={{ color: "#8B6914" }}>Match</span>
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a
              href="#how-it-works"
              style={{
                color: "#6B6560",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              How it works
            </a>
            <a
              href="#features"
              style={{
                color: "#6B6560",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              Features
            </a>
            <button
              onClick={() => setShowRoadmap(true)}
              style={{
                background: "none",
                border: "none",
                color: "#6B6560",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Roadmap
            </button>
          </div>
          <p style={{ color: "#6B6560", fontSize: "0.75rem", margin: 0 }}>
            © 2026 ThreadMatch
          </p>
        </div>
      </footer>
    </div>
  );
}
