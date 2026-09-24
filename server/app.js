const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const dns = require("dns");
const courseRoute = require("./routes/courseRoutes");
const authRoute = require("./routes/authRout");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.get("/welcome", (req, res) => {
    res.send("welcome");
});

app.use("/api/auth", authRoute);
app.use("/api/course", courseRoute);
app.use("/api/courses", courseRoute);

connectDB();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});