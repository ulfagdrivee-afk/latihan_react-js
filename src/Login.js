import { Component } from "react";
import axios from "axios";

class Login extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        data
      );

      // 🔥 simpan token
      localStorage.setItem("token", res.data.token);

      alert("Login berhasil");

      // bebas mau ke mana
      window.location.href = "/";

    } catch (err) {
      console.log(err);
      alert("Login gagal");
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-primary">Login</h2>

        <form
          className="p-4 bg-light rounded shadow"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
          />

          <button type="submit" className="btn btn-success m-2">
            Login
          </button>

          <a href="register" className="btn btn-success m-2">
            Register
          </a>
        </form>
      </div>
    );
  }
}

export default Login;