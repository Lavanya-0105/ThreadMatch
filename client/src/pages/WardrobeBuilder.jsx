import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Inventory ─────────────────────────────────────────────────────────
const INVENTORY = [
  {
    category: "Tops",
    emoji: "👚",
    gender: "both",
    items: [
      { id: "crew_tshirt", label: "Crew T-Shirt" },
      { id: "vneck_tshirt", label: "V-Neck T-Shirt" },
      { id: "graphic_tshirt", label: "Graphic T-Shirt" },
      { id: "polo", label: "Polo Shirt" },
      { id: "full_sleeve", label: "Full Sleeve Shirt" },
      { id: "half_sleeve", label: "Half Sleeve Shirt" },
      { id: "oversized_tshirt", label: "Oversized Tee" },
    ],
  },
  {
    category: "Women's Tops",
    emoji: "👗",
    gender: "female",
    items: [
      { id: "crop_top", label: "Crop Top" },
      { id: "tank_top", label: "Tank Top" },
      { id: "blouse", label: "Blouse" },
      { id: "camisole", label: "Camisole" },
      { id: "tube_top", label: "Tube Top" },
      { id: "peplum_top", label: "Peplum Top" },
      { id: "wrap_top", label: "Wrap Top" },
    ],
  },
  {
    category: "Shirts",
    emoji: "👔",
    gender: "both",
    items: [
      { id: "oxford_shirt", label: "Oxford Shirt" },
      { id: "linen_shirt", label: "Linen Shirt" },
      { id: "flannel_shirt", label: "Flannel Shirt" },
      { id: "denim_shirt", label: "Denim Shirt" },
      { id: "formal_shirt", label: "Formal Shirt" },
      { id: "camp_shirt", label: "Camp Collar Shirt" },
    ],
  },
  {
    category: "Bottoms",
    emoji: "👖",
    gender: "both",
    items: [
      { id: "slim_jeans", label: "Slim Jeans" },
      { id: "straight_jeans", label: "Straight Jeans" },
      { id: "baggy_jeans", label: "Baggy Jeans" },
      { id: "slim_chinos", label: "Slim Chinos" },
      { id: "cotton_trousers", label: "Cotton Trousers" },
      { id: "linen_trousers", label: "Linen Trousers" },
      { id: "cargo_pants", label: "Cargo Pants" },
      { id: "shorts", label: "Shorts" },
    ],
  },
  {
    category: "Women's Bottoms",
    emoji: "🩱",
    gender: "female",
    items: [
      { id: "mini_skirt", label: "Mini Skirt" },
      { id: "midi_skirt", label: "Midi Skirt" },
      { id: "maxi_skirt", label: "Maxi Skirt" },
      { id: "pencil_skirt", label: "Pencil Skirt" },
      { id: "pleated_skirt", label: "Pleated Skirt" },
      { id: "wide_leg", label: "Wide Leg Pants" },
      { id: "palazzo", label: "Palazzo Pants" },
    ],
  },
  {
    category: "Outerwear",
    emoji: "🧥",
    gender: "both",
    items: [
      { id: "blazer", label: "Blazer" },
      { id: "suit_jacket", label: "Suit Jacket" },
      { id: "denim_jacket", label: "Denim Jacket" },
      { id: "bomber", label: "Bomber Jacket" },
      { id: "trench_coat", label: "Trench Coat" },
      { id: "cardigan", label: "Cardigan" },
      { id: "hoodie", label: "Hoodie" },
      { id: "overshirt", label: "Overshirt" },
    ],
  },
];

const COLORS = [
  { id: "white", hex: "#FFFFFF", border: true },
  { id: "black", hex: "#1a1a1a" },
  { id: "grey", hex: "#9ca3af" },
  { id: "navy", hex: "#1e3a5f" },
  { id: "blue", hex: "#3b82f6" },
  { id: "beige", hex: "#d4b896" },
  { id: "brown", hex: "#7c4a1e" },
  { id: "olive", hex: "#6b7c3a" },
  { id: "maroon", hex: "#800000" },
  { id: "pink", hex: "#f9a8d4" },
  { id: "yellow", hex: "#fbbf24" },
  { id: "green", hex: "#16a34a" },
];

// Bottom categories — determines if item is a "bottom" for AI
const BOTTOM_IDS = new Set([
  "slim_jeans",
  "straight_jeans",
  "baggy_jeans",
  "slim_chinos",
  "cotton_trousers",
  "linen_trousers",
  "cargo_pants",
  "shorts",
  "mini_skirt",
  "midi_skirt",
  "maxi_skirt",
  "pencil_skirt",
  "pleated_skirt",
  "wide_leg",
  "palazzo",
]);

const OUTERWEAR_IDS = new Set([
  "blazer",
  "suit_jacket",
  "denim_jacket",
  "bomber",
  "trench_coat",
  "cardigan",
  "hoodie",
  "overshirt",
]);

export default function WardrobeBuilder() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({});
  const [expanded, setExpanded] = useState(null);

  // Clear previous wardrobe on mount so Recommendation always gets fresh data
  useEffect(() => {
    localStorage.removeItem("wardrobeSelection");
  }, []);

  const toggleItem = (itemId) => {
    setSelections((prev) => {
      if (prev[itemId]) {
        const next = { ...prev };
        delete next[itemId];
        if (expanded === itemId) setExpanded(null);
        return next;
      }
      setExpanded(itemId);
      return { ...prev, [itemId]: [] };
    });
  };

  const toggleColor = (itemId, colorId) => {
    setSelections((prev) => {
      const current = prev[itemId] || [];
      const updated = current.includes(colorId)
        ? current.filter((c) => c !== colorId)
        : [...current, colorId];
      return { ...prev, [itemId]: updated };
    });
  };

  const selectedIds = Object.keys(selections);
  const selectedCount = selectedIds.length;

  const handleGenerate = () => {
    if (selectedCount === 0) {
      alert("Please select at least one item");
      return;
    }

    // Categorise selections for the AI
    const tops = [],
      bottoms = [],
      outerwear = [];
    INVENTORY.forEach((cat) => {
      cat.items.forEach((item) => {
        if (!selections[item.id]) return;
        const entry = {
          id: item.id,
          label: item.label,
          colors: selections[item.id],
        };
        if (BOTTOM_IDS.has(item.id)) bottoms.push(entry);
        else if (OUTERWEAR_IDS.has(item.id)) outerwear.push(entry);
        else tops.push(entry);
      });
    });

    console.log(
      "Saving wardrobe:",
      JSON.stringify({ tops, bottoms, outerwear }, null, 2),
    );

    localStorage.setItem(
      "wardrobeSelection",
      JSON.stringify({ tops, bottoms, outerwear }),
    );
    navigate("/recommendation");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F2EE" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-20"
        style={{
          backgroundColor: "#FDFCFA",
          borderBottom: "1px solid #E2DDD6",
        }}
      >
        <h1 className="text-xl font-bold tracking-tight">ThreadMatch</h1>
        <div className="flex items-center gap-4">
          {selectedCount > 0 && (
            <span className="text-sm font-medium text-gray-500">
              {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
            </span>
          )}
          <button
            onClick={handleGenerate}
            disabled={selectedCount === 0}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                selectedCount > 0
                  ? "bg-black text-white hover:opacity-80"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            Find My Outfits →
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-1">
            What are you comfortable wearing today?
          </h2>
          <p className="text-gray-500 text-sm">
            Pick everything you'd consider — tops, bottoms, layers. We'll find
            the best combinations.
          </p>
        </div>

        {INVENTORY.map((cat) => (
          <section key={cat.category} className="mb-8">
            {/* Category header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{cat.emoji}</span>
              <h3 className="font-semibold text-gray-900 text-sm tracking-wide uppercase">
                {cat.category}
              </h3>
            </div>

            {/* Items — single horizontal scrollable row */}
            <div className="flex gap-2 flex-wrap">
              {cat.items.map((item) => {
                const isSelected = !!selections[item.id];
                const isExpanded = expanded === item.id;
                const itemColors = selections[item.id] || [];
                const previewColor =
                  itemColors.length > 0
                    ? COLORS.find(
                        (c) => c.id === itemColors[itemColors.length - 1],
                      )?.hex
                    : null;

                return (
                  <div key={item.id} className="flex flex-col gap-1.5">
                    {/* Item chip */}
                    <button
                      onClick={() => {
                        toggleItem(item.id);
                        if (isSelected) return;
                        setExpanded(item.id);
                      }}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all whitespace-nowrap
                        ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      {previewColor && (
                        <span
                          className="w-3 h-3 rounded-full border border-white/40 flex-shrink-0"
                          style={{ backgroundColor: previewColor }}
                        />
                      )}
                      {item.label}
                      {itemColors.length > 1 && (
                        <span
                          className={`text-xs rounded-full px-1.5 py-0.5 font-bold
                          ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
                        >
                          {itemColors.length}
                        </span>
                      )}
                    </button>

                    {/* Inline color picker — shows below selected item */}
                    {isSelected && isExpanded && (
                      <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm">
                        <p className="text-xs text-gray-400 mb-2 font-medium">
                          Pick colors
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {COLORS.map(({ id: colorId, hex, border }) => {
                            const picked = itemColors.includes(colorId);
                            return (
                              <button
                                key={colorId}
                                onClick={() => toggleColor(item.id, colorId)}
                                title={colorId}
                              >
                                <div
                                  style={{ backgroundColor: hex }}
                                  className={`w-5 h-5 rounded-full transition-all
                                    ${border ? "border border-gray-300" : ""}
                                    ${
                                      picked
                                        ? "ring-2 ring-black ring-offset-1 scale-110"
                                        : "hover:scale-110"
                                    }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => setExpanded(null)}
                          className="mt-2 text-xs text-gray-400 hover:text-black transition"
                        >
                          Done ✓
                        </button>
                      </div>
                    )}

                    {/* Collapsed color preview — tap to reopen */}
                    {isSelected && !isExpanded && (
                      <button
                        onClick={() => setExpanded(item.id)}
                        className="flex gap-1 items-center px-2"
                      >
                        {itemColors.length > 0 ? (
                          itemColors.map((cid) => {
                            const c = COLORS.find((x) => x.id === cid);
                            return c ? (
                              <div
                                key={cid}
                                style={{ backgroundColor: c.hex }}
                                className={`w-3.5 h-3.5 rounded-full ${c.border ? "border border-gray-300" : ""}`}
                              />
                            ) : null;
                          })
                        ) : (
                          <span className="text-xs text-gray-400">
                            + add colors
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <button
          onClick={handleGenerate}
          disabled={selectedCount === 0}
          className={`w-full py-4 rounded-2xl font-semibold text-base transition mt-4
            ${
              selectedCount > 0
                ? "bg-black text-white hover:opacity-90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          {selectedCount > 0
            ? `Find My Best Outfits (${selectedCount} items selected) →`
            : "Select items above to continue"}
        </button>
      </div>
    </div>
  );
}
