import mongoose from "mongoose";

// Kobler til databasen 
const connectDB = (URL) => {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => console.log("DB connected!"));
};

export default connectDB;
