function PrintNotaPage(item) {
  return `
        <div style="
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            background: white;
            color: #222;
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        ">

            <!-- header -->
            <div style="
                text-align:center;
                border-bottom:2px solid #000;
                padding-bottom:15px;
                margin-bottom:20px;
            ">
                <h1 style="
                    margin:0;
                    font-size:28px;
                    letter-spacing:2px;
                ">
                    LAUNDRY KU
                </h1>

                <p style="
                    margin:5px 0;
                    font-size:12px;
                    color:#555;
                ">
                    Jl. Laundry No.123, Bogor
                </p>

                <p style="
                    margin:0;
                    font-size:12px;
                    color:#555;
                ">
                    Telp: 0812-3456-7890
                </p>

                <h2 style="
                    margin-top:15px;
                    margin-bottom:0;
                    font-size:18px;
                ">
                    NOTA LAUNDRY
                </h2>
            </div>

            <!-- info -->
            <table style="
                width:100%;
                font-size:13px;
                margin-bottom:20px;
            ">
                <tbody>
                    <tr>
                        <td width="180"><b>No Tracking</b></td>
                        <td>: ${item.tracking_code}</td>
                    </tr>

                    <tr>
                        <td><b>Status</b></td>
                        <td>: ${item.status}</td>
                    </tr>

                    <tr>
                        <td><b>Tanggal Order</b></td>
                        <td>: ${item.order_date}</td>
                    </tr>
                </tbody>
            </table>

            <!-- CUSTOMER -->
            <div style="
                margin-bottom:20px;
                border:1px solid #ddd;
                padding:10px;
            ">
                <h3 style="
                    margin-top:0;
                    margin-bottom:10px;
                ">
                    Data Customer
                </h3>

                <table style="
                    width:100%;
                    font-size:13px;
                ">
                    <tbody>
                        <tr>
                            <td width="180"><b>Nama</b></td>
                            <td>: ${item.customer_name}</td>
                        </tr>

                        <tr>
                            <td><b>No HP</b></td>
                            <td>: ${item.customer_phone}</td>
                        </tr>

                        <tr>
                            <td><b>Alamat</b></td>
                            <td>: ${item.customer_address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- DETAIL -->
            <h3>Detail Laundry</h3>

            <table style="
                width:100%;
                border-collapse:collapse;
                margin-top:10px;
                font-size:13px;
            ">
                <thead>
                    <tr style="background:#f3f4f6;">
                        <th style="
                            border:1px solid #ddd;
                            padding:8px;
                            text-align:left;
                        ">
                            Layanan
                        </th>

                        <th style="
                            border:1px solid #ddd;
                            padding:8px;
                        ">
                            Berat
                        </th>

                        <th style="
                            border:1px solid #ddd;
                            padding:8px;
                            text-align:right;
                        ">
                            Total
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td style="
                            border:1px solid #ddd;
                            padding:8px;
                        ">
                            Laundry Cuci + Setrika
                        </td>

                        <td style="
                            border:1px solid #ddd;
                            padding:8px;
                            text-align:center;
                        ">
                            ${item.weight} Kg
                        </td>

                        <td style="
                            border:1px solid #ddd;
                            padding:8px;
                            text-align:right;
                        ">
                            Rp ${Number(item.total_price).toLocaleString("id-ID")}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- total-->
            <div style="
                margin-top:25px;
                border-top:2px solid #000;
                padding-top:15px;
                text-align:right;
            ">
                <div style="
                    font-size:14px;
                    margin-bottom:5px;
                ">
                    Total Pembayaran
                </div>

                <div style="
                    font-size:24px;
                    font-weight:bold;
                ">
                    Rp ${Number(item.total_price).toLocaleString("id-ID")}
                </div>
            </div>

            <!-- catatan-->
            ${
              item.notes
                ? `
                    <div style="
                        margin-top:25px;
                        border:1px dashed #999;
                        padding:10px;
                        font-size:12px;
                    ">
                        <b>Catatan:</b><br/>
                        ${item.notes}
                    </div>
                `
                : ""
            }

            <div style="
                margin-top:60px;
                text-align:center;
                font-size:11px;
                color:#666;
                border-top:1px dashed #ccc;
                padding-top:15px;
            ">
                <p>Terima kasih telah menggunakan jasa Laundry KU</p>
                <p>Simpan nota ini sebagai bukti transaksi</p>
            </div>

        </div>
    `;
}

export default PrintNotaPage;
