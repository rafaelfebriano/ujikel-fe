import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/Admin/Dashboard/NavbarAdmin";

function StaffPage() {
  // state data
  const [staff, setStaff] = useState([]);

  // loading
  const [loading, setLoading] = useState(true);

  // navigate
  const navigate = useNavigate();

  // get data staff
  const getStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://127.0.0.1:8000/api/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setStaff(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // delete staff
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

      await axios.delete(`http://127.0.0.1:8000/api/staff/${id}`, {
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

      getStaff();
    } catch (error) {
      console.error(error);

      alert("gagal menghapus staff");
    }
  };

  // first load
  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* navbar */}
      <NavbarAdmin />

      {/* content */}
      <div className="p-10">
        {/* top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-800">Data Staff</h1>

            <p className="text-slate-500 mt-2">Kelola akun staff laundry</p>
          </div>

          {/* button tambah */}
          <button onClick={() => navigate("/staff/create")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all">
            + tambah staff
          </button>
        </div>

        {/* table */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* table head */}
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-5 text-left">No</th>

                  <th className="px-6 py-5 text-left">Nama</th>

                  <th className="px-6 py-5 text-left">Email</th>

                  <th className="px-6 py-5 text-left">Role</th>

                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-500 font-semibold">
                      memuat data...
                    </td>
                  </tr>
                ) : staff.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-500 font-semibold">
                      data staff kosong
                    </td>
                  </tr>
                ) : (
                  staff.map((item, index) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                      {/* nomor */}
                      <td className="px-6 py-5 font-semibold text-slate-700">{index + 1}</td>

                      {/* nama */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{item.name.charAt(0)}</div>

                          <div>
                            <h1 className="font-bold text-slate-800">{item.name}</h1>
                          </div>
                        </div>
                      </td>

                      {/* email */}
                      <td className="px-6 py-5 text-slate-600">{item.email}</td>

                      {/* role */}
                      <td className="px-6 py-5">
                        <span className="bg-blue-100 text-blue-600 text-xs px-4 py-2 rounded-full font-bold">{item.role}</span>
                      </td>

                      {/* action */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">
                          {/* edit */}
                          <button onClick={() => navigate(`/staff/edit/${item.id}`)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-semibold transition-all">
                            edit
                          </button>

                          {/* delete */}
                          <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all">
                            delete
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
      </div>
    </div>
  );
}

export default StaffPage;
