import { mongoose } from "mongoose";

// Oppretter et skjema for brukere som er registrert i databasen
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
