
import dotenv from "dotenv";
import express from "express";
import authroutes from "./routes/auth.route.js"
import productroutes from "./routes/product.route.js"
import { connect } from "mongoose";
import { connectDb } from "./lib/db.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import carteRoutes from "./routes/cart.route.js"
import couponsRoutes from "./routes/coupon.route.js"
import payementRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import cors from "cors";


// mongo db password methode: aQ2ZkZy8xoX4ACck
//user name: mohssinem32

// Obtenir le chemin du fichier actuel (pour les modules ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') });



//console.log("MONGO_URI depuis server.js:", process.env.MONGO_URI);
const app = express();

//app.use(express.json()) // allow us to parse the body of the req


console.log("MONGO_URI depuis server.js:", process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: "50mb" })); // allows you to parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL exactly as shown in the error
  credentials: true, // Important for cookies
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

app.use("/api/auth", authroutes) //middleware pour définir des préfix pour les routes qui commencent par /api/auth/exemple1
app.use("/api/products", productroutes)
app.use("/api/cart", carteRoutes)
app.use("/api/coupons", couponsRoutes)
app.use("/api/payments", payementRoutes)
app.use("/api/analytics", analyticsRoutes)

app.listen(PORT, () => {
console.log(`Server is running on port ${process.env.PORT || 5001}`);
connectDb();
});
