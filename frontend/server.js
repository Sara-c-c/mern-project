const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key";

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Aquí normalmente validarías contra base de datos
  if (!email || !password) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  // Payload del token
  const payload = {
    user: email,
  };

  // Generar JWT
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
});