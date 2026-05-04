import { Component } from "react";
import axios from "axios";
import "./App.css";

class Currencies extends Component {
 state = {
  data: [],
  name: "",
  symbol: "",
  code: "",
  editId: null,
  showForm: false, // 🔥 ini penting
};

  componentDidMount() {
    this.getData();
  }

  // 🔥 READ
  getData = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/api/currencies",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ data: res.data.data.currencies });
  };

  // 🔥 HANDLE INPUT
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 🔥 CREATE & UPDATE
  handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const { name, symbol, code, editId } = this.state;

    if (editId) {
      // UPDATE
      await axios.put(
        `http://127.0.0.1:8000/api/currencies/${editId}`,
        { name, symbol, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // CREATE
      await axios.post(
        "http://127.0.0.1:8000/api/currencies",
        { name, symbol, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Create Currencies Successful");
    }

    this.setState({ name: "", symbol: "", code: "", editId: null });
    this.getData();
  };

  // 🔥 DELETE
  handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://127.0.0.1:8000/api/currencies/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.getData();
  };

  // 🔥 EDIT (ISI FORM)
  handleEdit = (item) => {
    this.setState({
      name: item.name,
      symbol: item.symbol,
      code: item.code,
      editId: item.id,
       showForm: true,
    errors: {}, 
    });
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

    <input
      name="symbol"
      placeholder="Symbol"
      value={this.state.symbol}
      onChange={this.handleChange}
      className="input"
    />

    <input
      name="code"
      placeholder="Code"
      value={this.state.code}
      onChange={this.handleChange}
      className="input"
    />
    <div className="button-group">
         <button className="submit-btn">
      {this.state.editId ? "Update" : "Simpan"}
    </button>

    {/* tombol batal */}
    <button
      type="button"
      className="btn"
      onClick={() =>
        this.setState({
          showForm: false,
          name: "",
          symbol: "",
          code: "",
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
                <th>Symbol</th>
                <th>Code</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.symbol}</td>
                  <td>{item.code}</td>
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

export default Currencies;