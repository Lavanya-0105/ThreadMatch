import { useEffect, useState } from "react";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const context = JSON.parse(localStorage.getItem("userContext"));

  useEffect(() => {
    const wardrobe = JSON.parse(localStorage.getItem("wardrobeSelection"));

    if (!wardrobe) return;

    const generated = [];

    const shirtColors = wardrobe.shirtColors?.length
      ? wardrobe.shirtColors
      : ["White"];

    const pantColors = wardrobe.pantColors?.length
      ? wardrobe.pantColors
      : ["Black"];

    shirtColors.forEach((shirtColor) => {
      pantColors.forEach((pantColor) => {
        generated.push({
          shirt: wardrobe.selectedShirt || "Full Sleeve Shirt",
          shirtColor,
          pant: wardrobe.selectedPant || "Straight Fit",
          pantColor,
        });
      });
    });

    setRecommendations(generated.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Outfit Recommendations</h1>

        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="font-bold mb-4">User Context</h2>
          <p>Weather: {context?.weather || "Not specified"}</p>
          <p>Body Type: {context?.bodyShape || "Not specified"}</p>
          <p>Occasion: {context?.occasion || "Not specified"}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded shadow">
              <h3 className="font-bold text-xl mb-4">Outfit #{index + 1}</h3>
              <p>👕 {item.shirt}</p>
              <p>Shirt Color: {item.shirtColor}</p>
              <p>👖 {item.pant}</p>
              <p>Pant Color: {item.pantColor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
