require("dotenv").config();
const express = require("express");
const ConnectDb = require("./db/ConnectDb");

const AuthRouter = require("./routers/AuthRouter");
const ProductsRouter = require("./routers/ProductRouter");
const PersonRouter = require("./routers/PersonRouter");
const BlogRouter = require("./routers/BlogRouter");
const QuestionsRouter = require("./routers/QuestionsRouter");
const AppointmentRouter = require("./routers/AppointmentRouter");
const CuponRouter = require("./routers/CuponRouter");
const CommentRouter = require("./routers/CommentRouter");
const CoursesRouter = require("./routers/CoursesRouter");
const AdminRouter = require("./routers/AdminRouter");

const { createAdmin } = require("./controllers/AdminController");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const PORT = 3001;

// DB connect və admin yaratmaq
ConnectDb()
  .then(() => {
    console.log("Database connected successfully");
    createAdmin();
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

// Routers
app.use("/api/auth", AuthRouter);
app.use("/api", ProductsRouter);
app.use("/api/persons", PersonRouter);
app.use("/api/courses", CoursesRouter);
app.use("/api/blogs", BlogRouter);
app.use("/api/questions", QuestionsRouter);
app.use("/api/appointments", AppointmentRouter);
app.use("/api/coupons", CuponRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/admin", AdminRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
