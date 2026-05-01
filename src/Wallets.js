import { Component } from "react";
class Wallets extends Component  {
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
                    <th>user_id</th>
                    <th>currency_id</th>
                    <th>Nama</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>Bank</td>
                
                    <td>
                        <button className="btn btn-warning m-2">Edit</button>
                        <button className="btn btn-danger m-2">Hapus</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>Dompet</td>
                   
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

export default Wallets;