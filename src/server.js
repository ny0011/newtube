import express from "express";
import morgan from "morgan";

const PORT = 5000;
const logger = morgan("dev");

const app = express();
const handleHome = (req, res) => {
  return res.send("Hello 🎈");
};
const handleLogin = (req, res) => {
  return res.send("Login here 🎇");
};

app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
