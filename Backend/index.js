const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
// const passport = require("./config/passport"); 
const cors = require("cors")


const userRoutes = require("./routes/User");
const connectDb = require("./config/db");

// Connect DB
connectDb();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",   // ✅ This is your frontend port
  credentials: true                  // Allow cookies to be sent
}));




// app.use(passport.initialize());

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
