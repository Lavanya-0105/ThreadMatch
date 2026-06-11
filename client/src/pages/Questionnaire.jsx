import { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = {
  weather: ["Hot", "Mild", "Cold"],

  gender: ["Male", "Female"],

  bodyShape: ["Rectangle", "Pear", "Apple", "Hourglass", "Athletic"],

  occasion: ["Casual", "Business Casual", "Formal", "Party", "Date Night"],
};

export default function Questionnaire() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    weather: "",
    gender: "",
    bodyShape: "",
    occasion: "",
  });

  const selectOption = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.weather ||
      !formData.gender ||
      !formData.bodyShape ||
      !formData.occasion
    ) {
      alert("Please complete all selections");
      return;
    }

    localStorage.setItem("userContext", JSON.stringify(formData));

    navigate("/wardrobe-builder");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-3">
          AI Adaptive Styling Engine
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Tell us about yourself before building your outfit.
        </p>

        {/* WEATHER */}

        <Section title="Current Weather">
          {options.weather.map((item) => (
            <Card
              key={item}
              active={formData.weather === item}
              onClick={() => selectOption("weather", item)}
            >
              {item}
            </Card>
          ))}
        </Section>

        {/* GENDER */}

        <Section title="Gender">
          {options.gender.map((item) => (
            <Card
              key={item}
              active={formData.gender === item}
              onClick={() => selectOption("gender", item)}
            >
              {item}
            </Card>
          ))}
        </Section>

        {/* BODY SHAPE */}

        <Section title="Body Shape">
          {options.bodyShape.map((item) => (
            <Card
              key={item}
              active={formData.bodyShape === item}
              onClick={() => selectOption("bodyShape", item)}
            >
              {item}
            </Card>
          ))}
        </Section>

        {/* OCCASION */}

        <Section title="Occasion">
          {options.occasion.map((item) => (
            <Card
              key={item}
              active={formData.occasion === item}
              onClick={() => selectOption("occasion", item)}
            >
              {item}
            </Card>
          ))}
        </Section>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-black text-white py-4 rounded-xl hover:opacity-90 transition"
        >
          Continue To Wardrobe Builder →
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function Card({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-5 rounded-xl border transition-all duration-200
      ${
        active
          ? "border-black bg-black text-white scale-105"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}
