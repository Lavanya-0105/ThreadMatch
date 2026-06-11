import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WardrobeBuilder() {
  const navigate = useNavigate();

  const shirts = [
    "Full Sleeve Shirt",
    "Half Sleeve Shirt",
    "Polo Shirt",
    "Plain T-Shirt",
    "Graphic T-Shirt",
  ];

  const pants = [
    "Slim Fit",
    "Straight Fit",
    "Regular Fit",
    "Boyfriend Fit",
    "Baggy Fit",
  ];

  const colors = [
    "Black",
    "White",
    "Grey",
    "Navy",
    "Blue",
    "Beige",
    "Brown",
    "Olive",
  ];

  const [selectedShirt, setSelectedShirt] = useState("");
  const [selectedPant, setSelectedPant] = useState("");
  const [shirtColors, setShirtColors] = useState([]);
  const [pantColors, setPantColors] = useState([]);

  const toggleShirtColor = (color) => {
    setShirtColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const togglePantColor = (color) => {
    setPantColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const generateOutfit = () => {
    localStorage.setItem(
      "wardrobeSelection",
      JSON.stringify({
        selectedShirt,
        selectedPant,
        shirtColors,
        pantColors,
      }),
    );

    navigate("/recommendation");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">Wardrobe Builder</h1>

        <h2 className="text-xl font-semibold mb-4">Select Shirt</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {shirts.map((shirt) => (
            <button
              key={shirt}
              onClick={() => setSelectedShirt(shirt)}
              className={`p-4 border rounded ${
                selectedShirt === shirt ? "bg-black text-white" : ""
              }`}
            >
              👕 {shirt}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Shirt Colors (Multiple)</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleShirtColor(color)}
              className={`px-4 py-2 border rounded ${
                shirtColors.includes(color) ? "bg-black text-white" : ""
              }`}
            >
              {color}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Select Pant</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {pants.map((pant) => (
            <button
              key={pant}
              onClick={() => setSelectedPant(pant)}
              className={`p-4 border rounded ${
                selectedPant === pant ? "bg-black text-white" : ""
              }`}
            >
              👖 {pant}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Pant Colors (Multiple)</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => togglePantColor(color)}
              className={`px-4 py-2 border rounded ${
                pantColors.includes(color) ? "bg-black text-white" : ""
              }`}
            >
              {color}
            </button>
          ))}
        </div>

        <button
          onClick={generateOutfit}
          className="w-full bg-black text-white py-4 rounded-lg hover:opacity-90"
        >
          Generate Outfit Recommendations
        </button>
      </div>
    </div>
  );
}
