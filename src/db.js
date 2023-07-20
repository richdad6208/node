import mongoose from "mongoose";
// mongoose.connect(process.env.DB_URL);
mongoose.connect("mongodb://127.0.0.1:27017/node");

const db = mongoose.connection;
const handleError = (error) => console.log(error, "❌ error occur");
const handleOpen = () => console.log("⭕ connected to database");

db.on("error", handleError);
db.once("open", handleOpen);
