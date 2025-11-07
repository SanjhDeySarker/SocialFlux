import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">SocialFlux Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-6 bg-white shadow rounded cursor-pointer hover:bg-gray-100"
          onClick={() => navigate("/scheduler")}
        >
          Schedule Posts
        </div>
        <div
          className="p-6 bg-white shadow rounded cursor-pointer hover:bg-gray-100"
          onClick={() => navigate("/analytics")}
        >
          View Analytics
        </div>
      </div>
    </div>
  );
}
