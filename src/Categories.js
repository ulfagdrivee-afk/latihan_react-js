import { Component } from "react";
class Categories extends Component  {
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
                    <th>Nama</th>
                    <th>Icon</th>
                    <th>Type</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Gaji Bulanan</td>
                    <td>📓</td>
                    <td>INCOME</td>
                    <td>
                        <button className="btn btn-warning m-2">Edit</button>
                        <button className="btn btn-danger m-2">Hapus</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Makanan</td>
                    <td>🍔</td>
                    <td>EXPENSE</td>
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

export default Categories;