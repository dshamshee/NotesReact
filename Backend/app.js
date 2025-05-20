const express = require("express");
const cookieParser = require("cookie-parser");
const DB_Connection = require("./config/DB_Connection");
const path = require("path");
// const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const postRouter = require("./routes/note");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Enable CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/note", postRouter);

app.listen(3000);
