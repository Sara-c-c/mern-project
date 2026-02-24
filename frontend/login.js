import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    if (!emailRegex.test(email)) {
      setMessage("El correo no es válido");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setMessage(
        "La contraseña debe tener una mayúscula, un número y un carácter especial"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setMessage("Login exitoso ✅");
    } catch (error) {
      setMessage("Error en el login ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Login;