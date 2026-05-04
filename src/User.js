import { Component } from "react";
import axios from "axios";
import "./App.css";

class User extends Component {
  state = {
    data: [],
    name: "",
    email: "",
    editId: null,
    showForm: false,
  };

  componentDidMount() {
    this.getData();
  }

  // 🔥 GET USER
  getData = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/api/users",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ data: res.data.data });
  };

  // 🔥 INPUT
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 🔥 CREATE & UPDATE
  handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const { name, email, editId } = this.state;

    if (editId) {
      await axios.put(
        `http://127.0.0.1:8000/api/users/${editId}`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/users",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    this.setState({
      name: "",
      email: "",
      editId: null,
      showForm: false,
    });

    this.getData();
  };

  // 🔥 DELETE
  handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://127.0.0.1:8000/api/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.getData();
  };

  // 🔥 EDIT
  handleEdit = (item) => {
    this.setState({
      name: item.name,
      email: item.email,
      editId: item.id,
      showForm: true,
    });
  };

  render() {
    return (
      <div className="content">

        {/* BUTTON */}
        <button
          className="add-btn"
          onClick={() => this.setState({ showForm: true })}
        >
          Tambah Data
        </button>

        {/* FORM */}
        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>

            <input
              name="name"
              placeholder="Nama"
              value={this.state.name}
              onChange={this.handleChange}
              className="input"
            />

            <input
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              className="input"
            />

            <div className="button-group">
              <button className="submit-btn">
                {this.state.editId ? "Update" : "Simpan"}
              </button>

              <button
                type="button"
                className="btn"
                onClick={() =>
                  this.setState({
                    showForm: false,
                    name: "",
                    email: "",
                    editId: null,
                  })
                }
              >
                Batal
              </button>
            </div>

          </form>
        )}

        {/* TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => this.handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    );
  }
}

export default User;