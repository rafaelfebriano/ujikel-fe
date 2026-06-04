import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/Admin/Dashboard/NavbarAdmin";

function CreateStaffPage() {
  //navigasi
  const navigate = useNavigate();

  //loading state
  const [loading, setLoading] = useState(false);

  //form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // ambil token login
      const token = localStorage.getItem("token");

      // kirim data ke backend
      await axios.post("http://127.0.0.1:8000/api/staff", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // notif sukses
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Staff berhasil dibuat",
        timer: 2000,
        showConfirmButton: false,
      });

      // kembali ke halaman staff
      navigate("/staff");
    } catch (error) {
      console.error(error);

      // tampilkan semua error dari laravel
      console.log("full error:", JSON.stringify(error.response?.data, null, 2));

      // jika validasi laravel gagal
      if (error.response?.status === 422) {
        const errors = error.response?.data?.errors;

        let errorMessage = "";

        if (errors) {
          Object.keys(errors).forEach((field) => {
            errorMessage += `${field}: ${errors[field][0]}\n`;
          });
        } else {
          errorMessage = error.response?.data?.message || "Validasi gagal";
        }

        Swal.fire({
          icon: "error",
          title: "Validasi Gagal",
          text: errorMessage,
        });
      } else {
        // error selain validasi
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response?.data?.message || "Gagal tambah staff",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* navbar */}
      <NavbarAdmin />

      {/* content */}
      <div className="p-10">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto">
          {/* title */}
          <h1 className="text-3xl font-black text-slate-800 mb-8">Tambah Staff</h1>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* nama */}
            <input
              type="text"
              placeholder="Nama"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border px-5 py-4 rounded-2xl"
              required
            />

            {/* email */}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border px-5 py-4 rounded-2xl"
              required
            />

            {/* password */}
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full border px-5 py-4 rounded-2xl"
              required
            />

            {/* button submit */}
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold disabled:opacity-50">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStaffPage;
