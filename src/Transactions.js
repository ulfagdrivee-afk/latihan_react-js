import { Component } from "react";
class Transactions extends Component  {
    render() {
        return (
             <div className="container mt-5">
                <div className="text-start">
                      <button className="btn btn-success">Tambah Data</button>
                </div>
              
                
           <table className="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Category_id</th>
                    <th>Wallet_id</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Note</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>500000</td>
                    <td>5/1/2026</td>
                    <td>Gaji Bulanan</td>
                    <td>
                        <button className="btn btn-warning m-2">Edit</button>
                        <button className="btn btn-danger m-2">Hapus</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>4</td>
                    <td>50000</td>
                    <td>5/1/2026</td>
                    <td>Makanan</td>
                    <td>
                        <button className="btn btn-warning m-2">Edit</button>
                        <button className="btn btn-danger m-2">Hapus</button>
                    </td>
                </tr>
            </tbody>

           </table>
            </div>
        )
    }
}

export default Transactions;