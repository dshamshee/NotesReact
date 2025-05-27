const express = require("express");
const cookieParser = require("cookie-parser");
const DB_Connection = require("./config/DB_Connection");
const path = require("path");
// const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const postRouter = require("./routes/note");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS for specific origin
const frontendUrl = process.env.FRONTEND_BASE_URL;
// const backendUrl = process.env.BACKEND_BASE_URL;
const backendUrl = process.env.RENDER_URL;
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_BASE_URL);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/note", postRouter);

// app.listen("https://notesreact.onrender.com");
app.listen(process.env.PORT,  ()=> {
  console.log(`app is live on ${process.env.PORT}`)
});
