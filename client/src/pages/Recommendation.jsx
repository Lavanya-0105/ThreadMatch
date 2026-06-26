import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const COLOR_HEX = {
  white: "#FFFFFF",
  black: "#1a1a1a",
  grey: "#9ca3af",
  navy: "#1e3a5f",
  blue: "#3b82f6",
  beige: "#d4b896",
  brown: "#7c4a1e",
  olive: "#6b7c3a",
  maroon: "#800000",
  pink: "#f9a8d4",
  yellow: "#fbbf24",
  green: "#16a34a",
  "any color": "#e5e7eb",
};

const RANK_LABELS = ["Best Match", "Runner Up", "Also Great"];
const RANK_STYLES = [
  { badge: "bg-black text-white", border: "border-black", shadow: "shadow-xl" },
  {
    badge: "bg-gray-700 text-white",
    border: "border-gray-300",
    shadow: "shadow-md",
  },
  {
    badge: "bg-gray-200 text-gray-700",
    border: "border-gray-200",
    shadow: "shadow-sm",
  },
];

function ColorSwatch({ colorName, size = "md" }) {
  const hex = COLOR_HEX[colorName?.toLowerCase()] || "#e5e7eb";
  const isWhite = colorName?.toLowerCase() === "white";
  const cls = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <span
      style={{ backgroundColor: hex }}
      className={`${cls} rounded-full inline-block flex-shrink-0 ${isWhite ? "border border-gray-200" : ""}`}
      title={colorName}
    />
  );
}

function OutfitCard({ outfit, rank }) {
  const style = RANK_STYLES[rank] || RANK_STYLES[2];
  const label = RANK_LABELS[rank] || `Option ${rank + 1}`;

  return (
    <div
      className={`bg-white rounded-2xl border-2 ${style.border} ${style.shadow} flex flex-col overflow-hidden`}
    >
      {/* Rank badge */}
      <div
        className={`${style.badge} px-4 py-2.5 flex items-center justify-between`}
      >
        <span className="text-xs font-bold tracking-widest uppercase">
          {label}
        </span>
        <span className="text-xs opacity-70">#{rank + 1}</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Outfit name */}
        <h3 className="text-lg font-bold tracking-tight mb-4 leading-tight">
          {outfit.name}
        </h3>

        {/* Top */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Top
          </p>
          <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
            <ColorSwatch colorName={outfit.topColor} />
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {outfit.top}
              </p>
              <p className="text-xs text-gray-400 capitalize mt-0.5">
                {outfit.topColor}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        {outfit.bottom && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Bottom
            </p>
            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
              <ColorSwatch colorName={outfit.bottomColor} />
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {outfit.bottom}
                </p>
                <p className="text-xs text-gray-400 capitalize mt-0.5">
                  {outfit.bottomColor}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Layer — if AI included one */}
        {outfit.layer && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Layer
            </p>
            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
              <ColorSwatch colorName={outfit.layerColor} />
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {outfit.layer}
                </p>
                <p className="text-xs text-gray-400 capitalize mt-0.5">
                  {outfit.layerColor || ""}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* AI reason */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          {outfit.reason}
        </p>

        {/* Styling note — shown when AI flags a mismatch */}
        {outfit.stylingNote && (
          <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
            <span className="text-amber-500 text-sm flex-shrink-0">💡</span>
            <p className="text-xs text-amber-700 leading-relaxed font-medium">
              {outfit.stylingNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Recommendation() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const context = JSON.parse(localStorage.getItem("userContext") || "{}");
  const wardrobe = JSON.parse(
    localStorage.getItem("wardrobeSelection") || "{}",
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      // Read fresh from localStorage inside effect — avoids stale closure
      const freshWardrobe = JSON.parse(
        localStorage.getItem("wardrobeSelection") || "{}",
      );
      const freshContext = JSON.parse(
        localStorage.getItem("userContext") || "{}",
      );
      const freshToken = localStorage.getItem("token");

      if (!freshWardrobe?.tops?.length && !freshWardrobe?.bottoms?.length) {
        setError("No wardrobe selection found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setRecommendations([]);
        const res = await axios.post(
          "http://localhost:5000/api/recommendations",
          { userContext: freshContext, wardrobe: freshWardrobe },
          { headers: { Authorization: `Bearer ${freshToken}` } },
        );
        setRecommendations(res.data.recommendations.slice(0, 3));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to generate recommendations",
        );
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [retryCount]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F2EE" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "#FDFCFA",
          borderBottom: "1px solid #E2DDD6",
        }}
      >
        <h1 className="text-xl font-bold tracking-tight">ThreadMatch</h1>
        <button
          onClick={() => navigate("/wardrobe-builder")}
          className="text-sm text-gray-400 hover:text-black transition"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Context summary */}
        {!loading && !error && (
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">
              Today's style brief
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                context.vibe,
                context.occasion,
                context.weather,
                context.bodyType && `${context.bodyType} body`,
              ]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            {context.freeText && (
              <p className="mt-3 text-sm text-gray-400 italic">
                "{context.freeText}"
              </p>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-5" />
            <p className="text-lg font-semibold tracking-tight">
              Finding your best outfits
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Our AI stylist is reviewing your wardrobe...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Couldn't generate outfits
            </p>
            <p className="text-sm text-gray-400 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setError("");
                  setLoading(true);
                  setRetryCount((c) => c + 1);
                }}
                className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/wardrobe-builder")}
                className="border border-gray-200 px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* Results — 3 cards side by side */}
        {!loading && !error && recommendations.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Your outfits for today
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Ranked by how well they match your vibe and occasion
              </p>
            </div>

            {/* 3-column card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {recommendations.map((outfit, idx) => (
                <OutfitCard key={idx} outfit={outfit} rank={idx} />
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/questionnaire")}
                className="flex-1 border-2 border-gray-200 py-3 rounded-xl text-sm font-semibold hover:border-black transition"
              >
                Change my vibe
              </button>
              <button
                onClick={() => navigate("/wardrobe-builder")}
                className="flex-1 bg-black text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                Try different items
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
