import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              AI Powered
              <br />
              Adaptive Styling
            </h1>

            <p className="mt-6 text-xl text-gray-600">
              Discover outfit combinations tailored to your body type, weather,
              occasion, and color preferences.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/signup"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Start Styling
              </Link>

              <Link to="/login" className="border px-6 py-3 rounded-lg">
                Login
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
              alt="fashion"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}

      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">
              1. Tell Us About Yourself
            </h3>

            <p>Select weather, body type, occasion and style preferences.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">2. Build Your Wardrobe</h3>

            <p>Choose shirt styles, pant styles and color preferences.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">3. Get Recommendations</h3>

            <p>Receive personalized outfit combinations instantly.</p>
          </div>
        </div>
      </section>

      {/* Features */}

      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-xl">
              <h3 className="font-bold text-xl mb-3">Personalized Styling</h3>

              <p>Recommendations based on body shape and occasion.</p>
            </div>

            <div className="p-8 border rounded-xl">
              <h3 className="font-bold text-xl mb-3">Multi Color Matching</h3>

              <p>Explore outfit combinations across multiple color palettes.</p>
            </div>

            <div className="p-8 border rounded-xl">
              <h3 className="font-bold text-xl mb-3">
                Adaptive Recommendations
              </h3>

              <p>Outfit suggestions change dynamically based on selections.</p>
            </div>

            <div className="p-8 border rounded-xl">
              <h3 className="font-bold text-xl mb-3">AI Ready</h3>

              <p>Designed for future OpenAI recommendation integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 text-center">
        <h2 className="text-5xl font-bold mb-6">Build Better Outfits</h2>

        <p className="text-xl text-gray-600 mb-8">
          Let StyleAI help you find the perfect combination.
        </p>

        <Link to="/signup" className="bg-black text-white px-8 py-4 rounded-xl">
          Get Started
        </Link>
      </section>
    </div>
  );
}
