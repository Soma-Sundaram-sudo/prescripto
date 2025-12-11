import express from "express"
import cors from "cors"
import "dotenv/config"
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import connectDB from "./config/mongodb.js";
import connectcloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: ["https://prescripto-frontend-psi-eight.vercel.app"],  
    credentials: true
}));

connectDB();
connectcloudinary();

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);

app.get("/",(req,res) => {
    res.send("API WORKING")
}) 

app.listen(port,() => console.log("Server Started",port))
