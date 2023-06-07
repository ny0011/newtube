import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 5000;
const logger = morgan("dev");
const app = express();
app.use(logger);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
