import { useEffect, useState } from "react";
import axios from "axios";

// component dashboard
import NavbarAdmin from "../../components/Admin/Dashboard/NavbarAdmin";
import StatisticCard from "../../components/Admin/Dashboard/StatisticCard";
import SalesChart from "../../components/Admin/Dashboard/SalesChart";

function DashboardAdminPage() {
  // state dashboard
  const [data, setData] = useState(null);

  // loading
  const [loading, setLoading] = useState(true);

  // error
  const [debugError, setDebugError] = useState("");

  useEffect(() => {
    // ambil token jwt
    const token = localStorage.getItem("token");

    // cek token
    if (!token) {
      setDebugError("Token tidak ditemukan");

      setLoading(false);

      return;
    }

    // request dashboard
    axios
      .get("http://127.0.0.1:8000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      .then((res) => {
        console.log(res.data);

        setData(res.data);

        setLoading(false);
      })

      .catch((err) => {
        console.error(err);

        setDebugError(err.response?.data?.message || "Terjadi kesalahan server");

        setLoading(false);
      });
  }, []);

  // loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold text-slate-700">Memuat Dashboard...</h1>
      </div>
    );
  }

  // error
  if (debugError) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50 px-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-200 max-w-lg w-full">
          <h1 className="text-3xl font-black text-red-600 mb-4">Dashboard Error</h1>

          <p className="text-slate-600">{debugError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <NavbarAdmin />

      <div className="p-8">
        {/* greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800">Halo, Admin</h1>
        </div>

        <StatisticCard data={data.statistics} />

        <SalesChart labels={data.chart.labels} data={data.chart.data} />

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Riwayat Aktivitas</h2>

          {data.activities?.length > 0 ? (
            <div className="space-y-4">
              {data.activities.map((item) => (
                <div key={item.id} className="border-b border-slate-200 pb-4">
                  <p className="font-semibold text-slate-800">Status: {item.status}</p>

                  <p className="text-sm text-slate-500">Diupdate oleh: {item.user?.name || `User ID ${item.updated_by}`}</p>

                  <p className="text-xs text-slate-400">{new Date(item.created_at).toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Belum ada riwayat aktivitas.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardAdminPage;
