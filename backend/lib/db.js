import mongoose from "mongoose";

//console.log("MONGO_URI:", process.env.MONGO_URI);
export const connectDb = async () => {
try {
const conn = await mongoose.connect(process.env.MONGO_URI);
console.log(`mongoDb connected: ${conn.connection.host}`);
}
catch (error) {
console.log("Error connectiong to mongoDb", error.message);
process.exit(1);
}
}