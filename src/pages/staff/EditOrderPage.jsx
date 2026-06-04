import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const getDetail = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://127.0.0.1:8000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm(res.data.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data order",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://127.0.0.1:8000/api/orders/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Order berhasil diupdate",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/staff/orders");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengupdate order",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button onClick={() => navigate("/staff/orders")} className="text-slate-500 hover:text-slate-700 mb-4 text-sm">
            ← Kembali
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Edit Order</h1>
          <p className="text-sm text-slate-500 mt-1">Tracking: {form.tracking_code || "-"}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Nama Customer */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Customer</label>
              <input
                type="text"
                name="customer_name"
                value={form.customer_name || ""}
                onChange={handleChange}
                placeholder="Masukkan nama customer"
                className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* no hp */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nomor HP</label>
              <input
                type="number"
                name="customer_phone"
                value={form.customer_phone || ""}
                onChange={handleChange}
                placeholder="Masukkan nomor telepon"
                className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
              <textarea
                name="customer_address"
                value={form.customer_address || ""}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                rows="3"
                className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-y"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select name="status" value={form.status || ""} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white" required>
                <option value="pending">pending</option>
                <option value="washing">washing</option>
                <option value="ironing">ironing</option>
                <option value="completed">completed</option>
                <option value="taken">taken</option>
              </select>
            </div>
            {/* 
                        {/* Informasi tambahan (readonly) */}
            {/* <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-sm">
                            <p className="font-medium text-slate-700 mb-2">Informasi Lainnya</p>
                            <div className="grid grid-cols-2 gap-3 text-slate-600">
                                <div>Berat: <span className="font-medium">{form.weight || "-"} kg</span></div>
                                <div>Total: <span className="font-medium">  Rp {Number(item.total_price).toLocaleString("id-ID")}</span></div>
                                <div>Order Date: {form.order_date || "-"}</div>
                                <div>Finish Date: {form.finish_date || "-"}</div>
                            </div> */}
            {/* </div> */}

            {/* Tombol */}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={submitting} className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-lg transition flex-1 disabled:opacity-50">
                {submitting ? "Menyimpan..." : "Update Order"}
              </button>
              <button type="button" onClick={() => navigate("/staff/orders")} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-6 py-3 rounded-lg transition">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOrderPage;
