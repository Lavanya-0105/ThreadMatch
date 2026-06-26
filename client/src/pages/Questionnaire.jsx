import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";

const VIBES = [
  {
    id: "comfortable",
    label: "Comfortable",
    emoji: "😌",
    desc: "Relaxed and easy",
  },
  { id: "bold", label: "Bold", emoji: "🔥", desc: "Stand out today" },
  { id: "minimal", label: "Minimal", emoji: "🤍", desc: "Clean and simple" },
  {
    id: "professional",
    label: "Professional",
    emoji: "💼",
    desc: "Sharp and put-together",
  },
  { id: "playful", label: "Playful", emoji: "🎨", desc: "Fun and expressive" },
  {
    id: "elegant",
    label: "Elegant",
    emoji: "✨",
    desc: "Refined and polished",
  },
];
const OCCASIONS = [
  { id: "casual", label: "Casual Day", emoji: "☕" },
  { id: "work", label: "Work / Office", emoji: "💻" },
  { id: "formal", label: "Formal Event", emoji: "🎩" },
  { id: "party", label: "Party / Night Out", emoji: "🎉" },
  { id: "date", label: "Date Night", emoji: "🌹" },
  { id: "outdoor", label: "Outdoor / Active", emoji: "🌿" },
];
const WEATHER = [
  { id: "hot", label: "Hot", emoji: "☀️", temp: "30°C+" },
  { id: "warm", label: "Warm", emoji: "🌤️", temp: "22–30°C" },
  { id: "mild", label: "Mild", emoji: "🌥️", temp: "15–22°C" },
  { id: "cold", label: "Cold", emoji: "🧥", temp: "Below 15°C" },
];
const BODY_TYPES = [
  { id: "rectangle", label: "Rectangle", desc: "Shoulders & hips same width" },
  { id: "pear", label: "Pear", desc: "Hips wider than shoulders" },
  { id: "apple", label: "Apple", desc: "Fuller midsection" },
  { id: "hourglass", label: "Hourglass", desc: "Defined waist" },
  { id: "athletic", label: "Athletic", desc: "Broad shoulders, narrow hips" },
];

const STEPS = [
  {
    title: "What's your vibe today?",
    subtitle: "Pick the feeling you're going for",
    field: "vibe",
    options: VIBES,
  },
  {
    title: "Where are you headed?",
    subtitle: "Your occasion shapes the whole outfit",
    field: "occasion",
    options: OCCASIONS,
  },
  {
    title: "What's the weather like?",
    subtitle: "We'll factor this into fabric and layering",
    field: "weather",
    options: WEATHER,
  },
  {
    title: "Your body type",
    subtitle: "Helps us suggest the most flattering silhouettes",
    field: "bodyType",
    options: BODY_TYPES,
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    vibe: "",
    occasion: "",
    weather: "",
    bodyType: "",
    freeText: "",
  });

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  const next = () => {
    if (!data[current.field]) {
      alert("Please make a selection to continue");
      return;
    }
    if (isLast) {
      localStorage.setItem("userContext", JSON.stringify(data));
      navigate("/wardrobe-builder");
    } else setStep((s) => s + 1);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: "#F5F2EE",
        minHeight: "100vh",
        color: "#1A1714",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          backgroundColor: "#FDFCFA",
          borderBottom: "1px solid #E2DDD6",
          padding: isMobile ? "0.875rem 1.25rem" : "1rem 2rem",
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
            fontSize: "1.1rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#1A1714",
            textDecoration: "none",
          }}
        >
          Thread<span style={{ color: "#8B6914" }}>Match</span>
        </Link>
        <span style={{ fontSize: "0.8rem", color: "#6B6560", fontWeight: 500 }}>
          Step {step + 1} of {STEPS.length}
        </span>
      </nav>

      {/* Progress */}
      <div style={{ height: "3px", backgroundColor: "#E2DDD6" }}>
        <div
          style={{
            height: "3px",
            backgroundColor: "#8B6914",
            width: `${progress}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: isMobile ? "1.5rem 1rem" : "3rem 1.5rem",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8B6914",
              margin: "0 0 0.75rem",
            }}
          >
            Step {step + 1} — {current.subtitle}
          </p>
          <h2
            style={{
              fontSize: isMobile ? "1.5rem" : "1.875rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#1A1714",
            }}
          >
            {current.title}
          </h2>
        </div>

        {/* Options — 1 col on mobile, 2 on tablet+ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {current.options.map((opt) => {
            const selected = data[current.field] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() =>
                  setData((p) => ({ ...p, [current.field]: opt.id }))
                }
                style={{
                  textAlign: "left",
                  padding: isMobile ? "1rem" : "1.25rem",
                  borderRadius: "0.875rem",
                  border: `2px solid ${selected ? "#1A1714" : "#E2DDD6"}`,
                  backgroundColor: selected ? "#1A1714" : "#FDFCFA",
                  color: selected ? "#fff" : "#1A1714",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                  display: isMobile ? "flex" : "block",
                  alignItems: isMobile ? "center" : "unset",
                  gap: isMobile ? "0.75rem" : "0",
                }}
              >
                {opt.emoji && (
                  <span
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                      display: isMobile ? "inline" : "block",
                      marginBottom: isMobile ? 0 : "0.625rem",
                    }}
                  >
                    {opt.emoji}
                  </span>
                )}
                <div>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      display: "block",
                    }}
                  >
                    {opt.label}
                  </span>
                  {opt.desc && (
                    <span
                      style={{
                        fontSize: "0.78rem",
                        marginTop: "0.2rem",
                        display: "block",
                        color: selected ? "rgba(255,255,255,0.7)" : "#6B6560",
                      }}
                    >
                      {opt.desc}
                    </span>
                  )}
                  {opt.temp && (
                    <span
                      style={{
                        fontSize: "0.78rem",
                        marginTop: "0.2rem",
                        display: "block",
                        color: selected ? "rgba(255,255,255,0.7)" : "#6B6560",
                      }}
                    >
                      {opt.temp}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Free text */}
        {isLast && (
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#4A4540",
                marginBottom: "0.5rem",
              }}
            >
              Anything specific in mind today?{" "}
              <span style={{ color: "#9C9488", fontWeight: 400 }}>
                (optional)
              </span>
            </label>
            <textarea
              value={data.freeText}
              onChange={(e) =>
                setData((p) => ({ ...p, freeText: e.target.value }))
              }
              placeholder="e.g. I want to wear my cotton trousers today..."
              rows={3}
              style={{
                width: "100%",
                border: "1.5px solid #E2DDD6",
                borderRadius: "0.75rem",
                padding: "0.875rem 1rem",
                fontSize: "0.875rem",
                backgroundColor: "#FDFCFA",
                color: "#1A1714",
                fontFamily: "inherit",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{
                padding: "0.875rem 1.5rem",
                border: "1.5px solid #E2DDD6",
                borderRadius: "999px",
                backgroundColor: "transparent",
                color: "#1A1714",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={next}
            style={{
              flex: 1,
              padding: "0.875rem",
              backgroundColor: "#1A1714",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {isLast ? "Build My Wardrobe →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
