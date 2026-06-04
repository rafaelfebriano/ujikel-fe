import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateOrderPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    weight: "",
    total_price: "",
    finish_date: "",
    notes: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("customer_name", form.customer_name);
      data.append("customer_phone", form.customer_phone);
      data.append("customer_address", form.customer_address);
      data.append("weight", form.weight);
      data.append("total_price", form.total_price);
      data.append("finish_date", form.finish_date);
      data.append("notes", form.notes);

      if (file) {
        data.append("clothing_image", file);
      }

      await axios.post("http://127.0.0.1:8000/api/orders", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Order berhasil dibuat",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/staff/orders");
    } catch (error) {
      console.error(error);
      setNotification({
        show: true,
        message: "Gagal membuat order",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      {notification.show && (
        <div className={`mb-4 px-4 py-3 rounded-lg font-medium ${notification.type === "success" ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"}`}>{notification.message}</div>
      )}

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Create Order</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAMA */}
          <div>
            <label className="block text-sm font-semibold mb-1">Nama Customer</label>
            <input name="customer_name" value={form.customer_name} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* HP */}
          <div>
            <label className="block text-sm font-semibold mb-1">No HP</label>
            <input name="customer_phone" value={form.customer_phone} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* ALAMAT */}
          <div>
            <label className="block text-sm font-semibold mb-1">Alamat</label>
            <textarea name="customer_address" value={form.customer_address} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* BERAT */}
          <div>
            <label className="block text-sm font-semibold mb-1">Berat (kg)</label>
            <input name="weight" type="number" value={form.weight} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* TOTAL */}
          <div>
            <label className="block text-sm font-semibold mb-1">Total Harga</label>
            <input name="total_price" type="number" value={form.total_price} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* TANGGAL */}
          <div>
            <label className="block text-sm font-semibold mb-1">Tanggal order</label>
            <input name="finish_date" type="date" value={form.finish_date} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-1">Foto Cucian</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="border p-2 w-full rounded" />
          </div>

          {/* CATATAN */}
          <div>
            <label className="block text-sm font-semibold mb-1">Catatan</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>

          {/* BUTTON */}
          <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:bg-blue-400">
            {loading ? "Loading..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrderPage;
