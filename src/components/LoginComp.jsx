import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import bgLaundry from "../assets/laundry.png";

function LoginComp() {
  // state input
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // state ui
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // login
  const handleLogin = async (e) => {
    e.preventDefault();

    // reset error
    setError("");

    // loading
    setIsLoading(true);

    try {
      // request login
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // ambil response
      const token = res.data.data.token;

      const user = res.data.data.user;

      const message = res.data.message;

      // debug console
      console.log("FULL RESPONSE :", res.data);

      console.log("USER :", user);

      console.log("ROLE :", user.role);

      // simpan localstorage
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      //redirect sesuai role

      // admin
      if (user.role?.toLowerCase().trim() === "admin") {
        navigate("/dashboard", {
          state: {
            success: message,
          },
        });
      }

      // staff
      else if (user.role?.toLowerCase().trim() === "staff") {
        navigate("/staff/orders", {
          state: {
            success: message,
          },
        });
      }

      // role ga dikenal
      else {
        console.log("role tidak terbaca");

        console.log(user.role);

        setError("Role user tidak valid");
      }
    } catch (err) {
      console.error(err);

      // tampilkan error merah
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      // matikan loading
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* kiri */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgLaundry})`,
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* text */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-black leading-tight">
            Laundry
            <span className="text-blue-600">Ku</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-md">Sistem manajemen laundry modern untuk tracking transaksi, monitoring, dan laporan.</p>
        </div>
      </div>

      {/* kanan */}
      <div className=" w-full lg:w-1/2 flex items-center justify-center bg-gray-100  px-6 py-10">
        <div className="w-full max-w-md">
          {/* heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-black text-blue-600">Welcome</h2>

            <p className="mt-3 text-gray-500">Login sebagai admin atau staff untuk masuk dashboard.</p>
          </div>

          {/* form */}
          <form onSubmit={handleLogin} className=" bg-white shadow-2xl rounded-3xl p-8 border  border-gray-100">
            {/* email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Email </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>

              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              ></input>
            </div>

            {/* error */}
            {error && <div className=" mb-4 bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-xl">{error}</div>}

            {/* button */}
            <button
              type="submit"
              disabled={isLoading}
              className={` w-full text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg

              ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
             `}
            >
              {isLoading ? "Mohon Tunggu..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
