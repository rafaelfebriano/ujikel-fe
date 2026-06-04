import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import PrintNotaPage from "../PrintNotaPage";

function StaffOrderPage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //payment modal
  const [payModal, setPayModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [qrShow, setQrShow] = useState(false);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://127.0.0.1:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Order?",
      text: "Data yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://127.0.0.1:8000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Order berhasil dihapus",
        timer: 2000,
        showConfirmButton: false,
      });
      getOrders();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menghapus order",
      });
    }
  };

  //open payment
  const openPayment = (item) => {
    setSelectedOrder(item);
    setPayModal(true);
    setQrShow(false);
  };

  const openQRIS = () => {
    setQrShow(true);
  };

  //hanle paymet
  const payNow = async (method) => {
    try {
      if (!selectedOrder) {
        Swal.fire({
          icon: "warning",
          title: "Oops",
          text: "Order belum dipilih",
        });
        return;
      }

      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/api/payments",
        {
          order_id: selectedOrder.id,
          payment_method: method.toLowerCase(),
          amount: selectedOrder.total_price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      await Swal.fire({
        icon: "success",
        title: "Payment Sukses",
        text: "Pembayaran berhasil",
        timer: 2000,
        showConfirmButton: false,
      });

      setPayModal(false);
      setSelectedOrder(null);
      setQrShow(false);

      getOrders();
    } catch (err) {
      console.error("payment error:", err.response?.data || err);
      Swal.fire({
        icon: "error",
        title: "Payment Gagal",
        text: err.response?.data?.message || "Payment gagal",
      });
    }
  };
  const handlePrint = async (item) => {
    try {
      const printContent = document.createElement("div");

      printContent.style.position = "absolute";
      printContent.style.top = "-9999px";
      printContent.style.left = "-9999px";
      printContent.style.width = "210mm";
      printContent.style.backgroundColor = "white";

      //isi print
      printContent.innerHTML = PrintNotaPage(item);

      document.body.appendChild(printContent);

      const canvas = await html2canvas(printContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`nota-${item.tracking_code}.pdf`);

      document.body.removeChild(printContent);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal download PDF",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-700";
      case "washing":
        return "bg-blue-100 text-blue-700";
      case "ironing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-700";
      case "taken":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* header*/}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Laundry</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola data laundry customer</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">
            Logout
          </button>

          <button onClick={() => navigate("/staff/orders/create")} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-sm transition">
            + Tambah Order
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-white">
              <tr className="text-left">
                <th className="px-5 py-3 font-semibold">No</th>
                <th className="px-5 py-3 font-semibold">Tracking</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Berat</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Foto</th>
                <th className="px-5 py-3 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-500">
                    Belum ada data order
                  </td>
                </tr>
              ) : (
                orders.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-5 py-3 text-slate-600">{index + 1}</td>
                    <td className="px-5 py-3 font-mono font-bold text-slate-700">{item.tracking_code}</td>
                    <td className="px-5 py-3">
                      <div>
                        <div className="font-medium text-slate-700">{item.customer_name}</div>
                        <div className="text-xs text-slate-400">{item.customer_phone}</div>
                        <div className="text-xs text-slate-400 truncate max-w-[200px]">{item.customer_address}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{item.weight} kg</td>
                    <td className="px-5 py-4 text-right font-medium">Rp {Number(item.total_price).toLocaleString("id-ID")}</td>
                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>{item.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      {item.clothing_image ? (
                        <img src={`http://127.0.0.1:8000/storage/${item.clothing_image}`} className="w-10 h-10 rounded-lg object-cover border border-slate-200" alt="foto" />
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button onClick={() => handlePrint(item)} className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                          Cetak
                        </button>
                        <button onClick={() => openPayment(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                          Pay
                        </button>
                        <button onClick={() => navigate(`/staff/orders/edit/${item.id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* payment modal*/}
      {payModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 max-w-[90%]">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Pembayaran Order</h2>

            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="font-semibold">Tracking:</span> {selectedOrder.tracking_code}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Customer:</span> {selectedOrder.customer_name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Total:</span> <span className="text-green-600 font-bold">Rp {selectedOrder.total_price}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button onClick={() => payNow("cash")} className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition">
                Bayar Tunai
              </button>

              <button onClick={openQRIS}>Bayar QRIS</button>
            </div>

            {/* qr*/}
            {qrShow && (
              <div className="mt-4 p-4 border rounded-lg text-center bg-slate-50">
                <p className="mb-2 font-medium">Scan QRIS Code</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LAUNDRY_PAYMENT" className="mx-auto border rounded-lg" alt="QR Code" />
                <button onClick={() => payNow("qris")} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition w-full">
                  sudah bayar
                </button>
              </div>
            )}

            <button onClick={() => setPayModal(false)} className="mt-4 text-red-500 hover:text-red-600 text-sm font-medium w-full text-center transition">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffOrderPage;
