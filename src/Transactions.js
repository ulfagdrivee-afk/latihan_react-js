import { Component } from "react";
import axios from "axios";
import "./App.css";

class Transactions extends Component {
  state = {
    data: [],
    categories: [],
    wallet: [],
    category_id: "",
    wallet_id: "",
    amount: "",
    date: "",
    note: "",
    editId: null,
    showForm: false,
  };

  componentDidMount() {
    this.getData();
    this.getWallet();
    this.getCategories();
  }

  // 🔥 GET TRANSACTIONS
getData = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/transactions",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({
      data: res.data.data.transactions || [],
    });
  } catch (err) {
    console.log(err);
  }
};

// 🔥 GET CATEGORIES
getCategories = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/categories",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({
      categories: res.data.data.categories || [],
    });
  } catch (err) {
    console.log(err);
  }
};

  // 🔥 GET WALLET
  getWallet = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/wallets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({
        wallet: res.data.data.wallets || [],
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
    const { category_id, wallet_id, amount, date, note, editId } = this.state;

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/transactions/${editId}`,
          { category_id, wallet_id, amount, date, note },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/transactions",
          {  category_id, wallet_id, amount, date, note },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      console.log({
  category_id,
  wallet_id,
  amount,
  date,
  note
});

      this.getData();
    } catch (err) {
  console.log("ERROR:", err.response?.data);
  alert(JSON.stringify(err.response?.data));
}
  };

 handleDelete = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/transactions/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ⚡ langsung hapus dari state (tanpa reload API)
    this.setState({
      data: this.state.data.filter((item) => item.id !== id),
    });

  } catch (err) {
    console.log(err);
  }
};

  // 🔥 EDIT
  handleEdit = (item) => {
    this.setState({
      name: item.name,
      category_id: item.category_id,
      wallet_id: item.wallet_id,
      amount: item.amount,
      date: item.date,
      note: item.note,
      editId: item.id,
      showForm: true,
    });
  };

  render() {
      const role = localStorage.getItem("role");

    return (
      <div className="container">

           {role === "admin" && (
  <button
    className="add-btn"
    onClick={() => this.setState({ showForm: true })}
  >
    + Tambah Data
  </button>
)}
    {role === "admin" && this.state.showForm && (
          <form onSubmit={this.handleSubmit} className="form">

            <select
              name="category_id"
              value={this.state.category_id}
              onChange={this.handleChange}
              className="input"
            >
              <option value="">Pilih Categories</option>
              {this.state.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}   ✅
              </option>
            ))}

            </select>
            <select
              name="wallet_id"
              value={this.state.wallet_id}
              onChange={this.handleChange}
              className="input"
            >
              <option value="">Pilih Wallet</option>
             {/* Wallets */}
          {this.state.wallet.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}   ✅
            </option>
          ))}
            </select>

            <input
            type="number"
              name="amount"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.handleChange}
              className="input"
            />
            <input
            type="date"
              name="date"
              placeholder="Date"
              value={this.state.date}
              onChange={this.handleChange}
              className="input"
            />
            <input
              name="note"
              placeholder="Note"
              value={this.state.note}
              onChange={this.handleChange}
              className="input"
            />

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
        <table className="btn-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Categories</th>
              <th>Wallet</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Note</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                {/* 🔥 pakai currency_code dari backend */}
                <td>{item.category_name}</td>
                <td>{item.wallet_name}</td>

                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>{item.note}</td>

              <td>
  {role === "admin" && (
    <>
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
    </>
  )}
</td>  
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    );
  }
}

export default Transactions;