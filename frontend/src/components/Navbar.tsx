import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LogOut, Home, Heart } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-10">
          <Link 
            to="/buyer-dashboard" 
            className="text-2xl font-semibold tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            HomeHub
          </Link>

          <div className="flex items-center gap-8 text-sm">
            <Link
              to="/buyer-dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              <Home size={20} />
              Dashboard
            </Link>
            
            <Link
              to="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              <Heart size={20} />
              My Favorites
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-500">Hello,</span>{" "}
            <span className="font-medium text-gray-800">
              {user.name || user.email?.split("@")[0]}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all active:scale-95"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}