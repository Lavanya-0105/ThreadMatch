import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ThreadMatch</h1>

        <div className="flex gap-6 items-center">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>

          <Link to="/login" className="px-4 py-2 border rounded-lg">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
