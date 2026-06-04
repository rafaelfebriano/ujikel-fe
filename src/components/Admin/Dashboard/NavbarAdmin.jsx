import { useNavigate } from "react-router-dom";
import { Users, LogOut } from "lucide-react";

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="w-full bg-slate-900 px-10 py-5 flex items-center justify-between shadow-xl">
      {/* kiri */}
      <div>
        <h1 className="text-2xl font-black text-white">
          Laundry<span className="text-blue-500">Ku</span>
        </h1>

        <p className="text-slate-400 text-sm mt-1">Admin Dashboard</p>
      </div>

      {/* kanan */}
      <div className="flex items-center gap-4">
        {/* button staff */}
        <button onClick={() => navigate("/staff")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold transition-all shadow-lg">
          <Users size={18} />
          Kelola Staff
        </button>

        {/* logout */}
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavbarAdmin;
