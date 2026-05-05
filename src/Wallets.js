import { Component } from "react";
import axios from "axios";
import "./App.css";

class Wallets extends Component {
  state = {
    data: [],
    currencies: [],
    name: "",
    user_id: "",
    currency_id: "",
    editId: null,
    showForm: false,
  };

  componentDidMount() {
    this.getData();
    this.getCurrencies();
    this.getUserLogin();
  }

  // 🔥 USER LOGIN
  getUserLogin = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({ user_id: res.data.id });
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 GET WALLET
  getData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/wallets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({
        data: res.data.data.wallets || [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 GET CURRENCY
  getCurrencies = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/currencies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({
        currencies: res.data.data.currencies || [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 INPUT
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 🔥 SIMPAN / UPDATE
  handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const { name, user_id, currency_id, editId } = this.state;

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/wallets/${editId}`,
          { name, user_id, currency_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/wallets",
          { name, user_id, currency_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      this.setState({
        name: "",
        currency_id: "",
        editId: null,
        showForm: false,
      });

      this.getData();
    } catch (err) {
      console.log(err.response?.data);
      alert("Gagal simpan data");
    }
  };

  // 🔥 DELETE
  handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/wallets/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      this.getData();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 EDIT
  handleEdit = (item) => {
    this.setState({
      name: item.name,
      currency_id: item.currency_id,
      editId: item.id,
      showForm: true,
    });
  };

  render() {
    return (
      <div className="container">

        {/* BUTTON */}
        <button
          className="add-btn"
          onClick={() => this.setState({ showForm: true })}
        >
          + Tambah Data
        </button>

        {/* FORM */}
        {this.state.showForm && (
          <form onSubmit={this.handleSubmit} className="form">

            <input
              name="name"
              placeholder="Nama Wallet"
              value={this.state.name}
              onChange={this.handleChange}
              className="input"
            />

            {/* CURRENCY */}
            <select
              name="currency_id"
              value={this.state.currency_id}
              onChange={this.handleChange}
              className="input"
            >
              <option value="">Pilih Currency</option>
              {this.state.currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}
                </option>
              ))}
            </select>

            <div className="button-group">
              <button className="submit-btn">
                {this.state.editId ? "Update" : "Simpan"}
              </button>

              <button
                type="button"
                className="btn cancel"
                onClick={() => this.setState({ showForm: false })}
              >
                Batal
              </button>
            </div>

          </form>
        )}

        {/* TABLE */}
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Currency</th>
              <th>Nama</th>
              <th>Balance</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                {/* 🔥 pakai user_id */}
                <td>{item.user_id}</td>

                {/* 🔥 pakai currency_code dari backend */}
                <td>{item.currency_code}</td>

                <td>{item.name}</td>
                  <td>Rp {item.balance?.toLocaleString()}</td>

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
    );
  }
}

export default Wallets;