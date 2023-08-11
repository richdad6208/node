import "dotenv/config";
import "./models/Video";
import "./models/User";
import "./db";
import app from "./server";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`⭕ Now You Connected ${PORT}PORT SERVER`));
