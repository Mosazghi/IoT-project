import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

const handleLogin = (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username })
        // if user exists
        .then((user) => {
            if (req.body.password === user.password) {
                // create JWT token
                const token = jwt.sign(
                    {
                        userId: user._id,
                        userName: user.username,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "2h" }
                );

                res.status(200).send({
                    user: user.username,
                    admin: user.admin,
                    message: "Login Successful",
                    token,
                });
                console.log("Login Successful");
            }

            // catch error if password does not match
            else {
                res.status(400).send({
                    message: "Passwords does not match",
                    error,
                });
                console.log("Passwords does not match");
            }
        })
        // catch error if user does not exist
        .catch((e) => {
            res.status(404).send({
                message: "Email not found",
                e,
            });
        });
};

const handleRegister = asyncHandler(async (req, res) => { 
    
});

const logout = (req, res) => {
    req.logout(() => console.log("OK!"));
    res.redirect("/");
};

export { handleLogin, logout, handleRegister };
