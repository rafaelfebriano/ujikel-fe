import { DollarSign, ShoppingBag, Users, ClipboardList } from "lucide-react";

function StatisticCards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* pendapatan */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Pendapatan</p>

            <h1 className="text-3xl font-black text-slate-800 mt-2">Rp {Number(data?.total_income || 0).toLocaleString("id-ID")}</h1>
          </div>

          <div className="bg-green-100 p-4 rounded-2xl">
            <DollarSign className="text-green-600" />
          </div>
        </div>
      </div>

      {/* order */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">Total Order</p>

            <h1 className="text-3xl font-black text-slate-800 mt-2">{data?.total_order || 0}</h1>
          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">
            <ShoppingBag className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticCards;
