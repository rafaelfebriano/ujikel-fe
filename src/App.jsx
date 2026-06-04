import "./App.css";
import bgLaundry from "./assets/laundry.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function App() {
  const [trackingCode, setTrackingCode] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleCheck = async () => {
    if (!trackingCode) {
      alert("Masukkan kode tracking");
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/tracking/${trackingCode}`);

      setResult(res.data.data);
      setMessage("");
    } catch (error) {
      setResult(null);
      setMessage("Kode tracking tidak ditemukan");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgLaundry})`,
      }}
    >
      {/* overlay */}
      <div className="min-h-screen bg-black/70 flex flex-col">
        {/* navbar */}
        <nav className="flex items-center justify-between px-5 py-4 md:px-10">
          <h1 className="text-white font-black text-2xl">
            Laundry<span className="text-blue-500">Ku</span>
          </h1>

          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 duration-300 text-white text-sm md:text-base px-4 py-2 rounded-xl font-semibold shadow-lg">
            Login
          </Link>
        </nav>

        {/* hero */}
        <section className="flex-1 flex items-center justify-center px-5">
          <div className="w-full max-w-4xl text-center">
            {/* title */}
            <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl md:text-6xl">
              cek status laundry
              <span className="text-blue-500 block mt-1">secara real-time</span>
            </h1>

            {/* deskrpsi*/}
            <p className="text-gray-300 mt-5 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">masukkan kode tracking laundry pada struk yang sudah diberikan oleh petugas</p>

            {/* search */}
            <div className="mt-8 w-full max-w-2xl mx-auto flex flex-col gap-6">
              <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-3 flex flex-col sm:flex-row gap-3 shadow-2xl">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="masukkan kode tracking..."
                  className="flex-1 bg-transparent text-white placeholder:text-gray-300 outline-none px-4 py-3 text-sm sm:text-base"
                />

                <button onClick={handleCheck} className="bg-blue-600 hover:bg-blue-700 duration-300 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  cek
                  <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z" />
                  </svg>
                </button>
              </div>

              {/*hasil status*/}
              {message && (
                <div className="bg-white rounded-2xl p-6 shadow-2xl text-center">
                  <h2 className="text-xl font-bold text-red-500">{message}</h2>
                </div>
              )}
              {result && (
                <div className="bg-white rounded-2xl p-6 shadow-2xl text-left flex flex-col gap-3">
                  <h2 className="text-2xl font-bold mb-2 text-slate-800">status laundry</h2>

                  <p className="text-slate-700">
                    <strong>Tracking :</strong> {""} {result.tracking_code}
                  </p>

                  <p className="text-slate-700">
                    <strong>Customer :</strong> {""} {result.customer_name}
                  </p>

                  <p className="text-slate-700">
                    <strong>Status : </strong> {""} {result.status}
                  </p>

                  <p className="text-slate-700">
                    <strong>tanggal order :</strong> {""} {result.finish_date}
                  </p>

                  <p className="text-slate-700">
                    <strong>Catatan :</strong> {""} {result.notes || "-"}
                  </p>

                  {result.clothing_image && (
                    <div className="mt-4">
                      <p className="mb-2 font-semibold text-slate-700">Foto awal cucian anda :</p>
                      <img src={`http://127.0.0.1:8000/storage/${result.clothing_image}`} className="rounded-xl w-64" alt="Foto cucian" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
