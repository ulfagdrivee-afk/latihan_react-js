import { Component } from "react";
import axios from "axios";
import "./App.css";

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

      const token = res.data.data.token;

      localStorage.setItem("token", token);

      alert("Login berhasil");

      window.location.href = "/home";

    } catch (err) {
      console.log(err);
      alert("Login gagal");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="card">

          <h2 className="title">Login</h2>

          <form onSubmit={this.handleSubmit} className="form">
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
            />

            <button type="submit" className="btn">
              Login
            </button>

          </form>

          <p className="link">
            Belum punya akun? <a href="/register">Register</a>
          </p>

        </div>
      </div>
    );
  }
}

export default Login;