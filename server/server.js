import express from "express";
import productsRouter from "./router/products.router.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from 'path'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve() 


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/products", productsRouter);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}


app.listen(PORT, () => {
  connectDB();
  console.log("App listening on port: " + PORT);
});
