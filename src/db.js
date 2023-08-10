import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleError = (error) => console.log(error, "❌ error occur");
const handleOpen = () => console.log("⭕ connected to database");

db.on("error", handleError);
db.once("open", handleOpen);
