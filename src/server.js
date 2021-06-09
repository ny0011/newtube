import express from "express";
import logger from "morgan"

const PORT = 5000;

const app = express();
const handleHome = (req, res) => {
    return res.send("Hello 🎈")
}
const handleLogin = (req, res) => {
    return res.send("Login here 🎇")
}


app.use(logger("combined"))
app.get("/", handleHome)
app.get("/login", handleLogin)

const handleListening = () =>
    console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);