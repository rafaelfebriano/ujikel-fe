import { useNavigate } from "react-router-dom";

function StaffTable({ staff, loading, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-5 text-left">No</th>
            <th className="px-6 py-5 text-left">Nama</th>
            <th className="px-6 py-5 text-left">Email</th>
            <th className="px-6 py-5 text-left">Role</th>
            <th className="px-6 py-5 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-10">
                loading...
              </td>
            </tr>
          ) : (
            staff.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-6 py-5">{index + 1}</td>

                <td className="px-6 py-5">{item.name}</td>

                <td className="px-6 py-5">{item.email}</td>

                <td className="px-6 py-5">{item.role}</td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => navigate(`/staff/edit/${item.id}`)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-semibold">
                      edit
                    </button>

                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold">
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
  );
}

export default StaffTable;
