import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 *  Håndterer innlogging av brukere
 */
const handleLogin = asyncHandler(async (req, res) => {
    // Sjekk om bruker finnes
    const user = await User.findOne({ username: req.body.username.toLowerCase() });

    if (!user) {
        res.status(401).send({
            message: "Invalid username or password",
        });
    } else {
        // Sjekk om passord er riktig ved å sammenligne (dekryptert) hash-passorder med passordet som ble mottatt
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(401).send({
                message: "Invalid username or password",
            });
        } else {
            // Generer token
            const token = jwt.sign({ id: user._id, name: user.username, admin: user.admin }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            // Send respons til klienten med token og lagrer det som en cookie
            res.status(200).send({
                message: "Login successful",
                token,
            });
        }
    }
});

/**
 * Håndterer registrering av brukere
 */
const handleRegister = asyncHandler(async (req, res) => {
    // Sjekk om bruker finnes
    const user = await User.findOne({ username: req.body.username.toLowerCase() });

    if (user) {
        res.status(400).send({
            message: "Username already exists",
        });
    } else {
        // Hash passordet før det lagres i databasen
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Lag ny bruker
        const newUser = new User({
            username: req.body.username.toLowerCase(),
            password: hashedPassword,
            admin: req.body.admin,
        });
        // Lagre bruker i databasen
        const savedUser = await newUser.save();

        // Send respons til klienten
        res.status(200).send({
            message: "User created successfully",
            savedUser,
        });
    }
});

export { handleLogin, handleRegister };
