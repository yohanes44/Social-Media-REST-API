require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");

const { authenticate} = require("./authentication");

require("./db");
require("./authentication");
app.use(cors());
app.use(express.json());

authenticate(app);

app.post("/login",  passport.authenticate("local", { failureRedirect: '/loginFailure', failureMessage: true }),(req, res) => {
    console.log(req.body);
    res.status(200).json({
        success: true,
        message: "Loged In Succesfully"
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})