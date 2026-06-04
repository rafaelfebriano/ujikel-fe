import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import NavbarAdmin from "../../components/Admin/Dashboard/NavbarAdmin";

function EditStaffPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  // ambil data staff
  const getStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://127.0.0.1:8000/api/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setForm({
        name: res.data.data.name,
        email: res.data.data.email,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data staff",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://127.0.0.1:8000/api/staff/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Staff berhasil diupdate",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/staff");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Gagal update staff",
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-xl font-bold">Memuat data...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <NavbarAdmin />

      <div className="max-w-2xl mx-auto p-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-black text-slate-800 mb-6">Edit Staff</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Nama</label>

              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded-xl p-3" required />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Email</label>

              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded-xl p-3" required />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">
              Update Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStaffPage;
