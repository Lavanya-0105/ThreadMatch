import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    vibe: "",
    occasion: "",
    weather: "",
    bodyType: "",
    freeText: "",
  });

  const steps = [
    {
      title: "What's your vibe today?",
      subtitle: "Pick the feeling you're going for",
      field: "vibe",
      options: VIBES,
      type: "vibe",
    },
    {
      title: "Where are you headed?",
      subtitle: "Your occasion shapes the whole outfit",
      field: "occasion",
      options: OCCASIONS,
      type: "simple",
    },
    {
      title: "What's the weather like?",
      subtitle: "We'll factor this into fabric and layering",
      field: "weather",
      options: WEATHER,
      type: "weather",
    },
    {
      title: "Your body type",
      subtitle: "Helps us suggest the most flattering silhouettes",
      field: "bodyType",
      options: BODY_TYPES,
      type: "body",
    },
  ];

  const current = steps[step];
  const isLastStep = step === steps.length - 1;

  const select = (value) => {
    setData((prev) => ({ ...prev, [current.field]: value }));
  };

  const next = () => {
    if (!data[current.field]) {
      alert("Please make a selection to continue");
      return;
    }
    if (isLastStep) {
      localStorage.setItem("userContext", JSON.stringify(data));
      navigate("/wardrobe-builder");
    } else {
      setStep((s) => s + 1);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">ThreadMatch</h1>
        <span className="text-sm text-gray-500">
          Step {step + 1} of {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-1 bg-black transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Step title */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">{current.title}</h2>
          <p className="text-gray-500">{current.subtitle}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {current.options.map((opt) => {
            const selected = data[current.field] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => select(opt.id)}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-200
                  ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
              >
                {opt.emoji && (
                  <span className="text-2xl block mb-2">{opt.emoji}</span>
                )}
                <span className="font-semibold block">{opt.label}</span>
                {opt.desc && (
                  <span
                    className={`text-sm mt-1 block ${selected ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {opt.desc}
                  </span>
                )}
                {opt.temp && (
                  <span
                    className={`text-sm mt-1 block ${selected ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {opt.temp}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Free text — only on last step */}
        {isLastStep && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anything specific in mind today? (optional)
            </label>
            <textarea
              value={data.freeText}
              onChange={(e) =>
                setData((prev) => ({ ...prev, freeText: e.target.value }))
              }
              placeholder="e.g. I want to wear my cotton trousers today, something breathable..."
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-black resize-none"
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-400 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isLastStep ? "Build My Wardrobe →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
