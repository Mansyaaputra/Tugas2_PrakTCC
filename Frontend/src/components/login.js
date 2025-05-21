import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ← Tambahkan Link
import { BASE_URL } from "../utils";
import "../NoteList.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      alert("Login berhasil");
      navigate("/");
    } catch (err) {
      console.error("Login gagal:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>

      {/* Link ke register */}
      <p style={{ marginTop: "15px" }}>
        Belum punya akun?{" "}
        <Link to="/register" style={{ color: "#1db954" }}>
          Daftar di sini
        </Link>
      </p>
    </form>
  );
};

export default Login;
