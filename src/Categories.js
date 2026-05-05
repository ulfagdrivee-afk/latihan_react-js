import { Component } from "react";
import axios from "axios";
import "./App.css";

class Categories extends Component {
 state = {
  data: [],
  name: "",
  icon: "",
  type: "",
  editId: null,
  showForm: false, 
  errors: {},
};

  componentDidMount() {
    this.getData();
  }

  // 🔥 READ
  getData = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/api/categories",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ data: res.data.data.categories });
  };

  // 🔥 HANDLE INPUT
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 🔥 CREATE & UPDATE
 handleSubmit = async (e) => {
  e.preventDefault();
   if (this.state.loading) return; 

     this.setState({ loading: true });

  const token = localStorage.getItem("token");
  const { name, icon, type, editId } = this.state;

  try {
    if (editId) {
      await axios.put(
        `http://127.0.0.1:8000/api/categories/${editId}`,
        { name, icon, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Update Categories Successful");

    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/categories",
        { name, icon, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Create Categories Successful");


    }

    // ✅ reset setelah sukses
    this.setState({
      name: "",
      icon: "",
      type: "",
      editId: null,
      showForm: false,
      errors: {}, // reset error
    });

    this.getData();

  } catch (err) {
    console.log(err.response.data); // 🔥 lihat error backend

    this.setState({
      errors: err.response?.data?.errors || {},
    });
  }
};

  // 🔥 EDIT (ISI FORM)
  handleEdit = (item) => {
    this.setState({
      name: item.name,
      icon: item.icon,
      type: item.type,
      editId: item.id,
       showForm: true,
    errors: {}, 
    });
  };

  // 🔥 DELETE
handleDelete = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/categories/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // refresh data setelah delete
    this.getData();

  } catch (err) {
    console.log(err);
  }
};

  render() {
    return (
      <div className="content">
        <button
  className="add-btn"
  onClick={() => this.setState({ showForm: true, editId: null })}
>
  Tambah Data
</button>
     {this.state.showForm && (
  <form onSubmit={this.handleSubmit}>
    <input
      name="name"
      placeholder="Nama"
      value={this.state.name}
      onChange={this.handleChange}
      className="input"
    />

    {this.state.errors.name && (
  <p className="error">{this.state.errors.name[0]}</p>
)}

    <input
      name="icon"
      placeholder="Icon"
      value={this.state.icon}
      onChange={this.handleChange}
      className="input"
    />

    {this.state.errors.icon && (
  <p className="error">{this.state.errors.icon[0]}</p>
)}

    <input
      name="type"
      placeholder="Type"
      value={this.state.type}
      onChange={this.handleChange}
      className="input"
    />
{this.state.errors.type && (
  <p className="error">{this.state.errors.type[0]}</p>
)}
    <div className="button-group">
        <button className="submit-btn" disabled={this.state.loading}>
  {this.state.loading
    ? "Loading..."
    : this.state.editId
    ? "Update"
    : "Simpan"}
</button>
    {/* tombol batal */}
    <button
      type="button"
      className="btn"
      onClick={() =>
        this.setState({
          showForm: false,
          name: "",
          icon: "",
          type: "",
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
                <th>Icon</th>
                <th>Type</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.icon}</td>
                  <td>{item.type}</td>
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

export default Categories;