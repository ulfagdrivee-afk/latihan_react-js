import { Component } from "react";
class User extends Component  {
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
                    <th>Email</th>
                    <th>Password</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>User 1</td>
                    <td>user1@gmail.com</td>
                    <td>123456</td>
                    <td>
                        <button className="btn btn-warning m-2">Edit</button>
                        <button className="btn btn-danger m-2">Hapus</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>User 2</td>
                    <td>user2@gmail.com</td>
                    <td>1234567</td>
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

export default User;