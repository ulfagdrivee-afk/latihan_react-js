import { Component } from "react";
import axios from "axios";

class Register extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", data);

      alert("Register berhasil, silakan login");

      window.location.href = "/login";

    } catch (err) {
      console.log(err);
      alert("Register gagal");
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-primary">Register</h2>

        <form
          className="p-4 bg-light rounded shadow"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Name"
          />

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

          {/* 🔥 tetap style sama, tapi jadi button */}
          <button type="submit" className="btn btn-success m-2">
            Register
          </button>

          <a href="login" className="btn btn-success m-2">
            Login
          </a>
        </form>
      </div>
    );
  }
}

export default Register;