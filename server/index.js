const express = require("express");
const path = require("path");
const session = require("express-session");
// const passport = require("passport");
// const { errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();
// const connectDB = require("./config/db.config");
// const initializePassport = require("./config/passport");
const PORT = 5000;
const cors = require("cors");
const app = express();

// connectDB(process.env.DATABASE_URL);
// console.log("using", process.env.USER, process.env.PASSWORD);
// initializePassport(passport);
app.use(cors());
//LOGGER
app.use((req, res, next) => {
    console.log(`HTTP Method - ${req.method}, URL - ${req.url}`);
    next();
});

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//     next();
// });

// app.use(session({ secret: "test", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/admin", require("./routes/loginRoute"));
// app.use(errorHandler);

app.get("/api", (req, res) => {
    res.json({ message: "IOT PROSJEKT" });
});

app.get("/test", (req, res) => {
    res.json({ message: "TESTSSSS" });
});

app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/dist/index.html"));
});
// app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "..", "client/dist/index.html"), function (err) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

app.listen(PORT, () => {
    console.log(`Server started on port  http://localhost:${PORT}`);
});

module.exports = app;
