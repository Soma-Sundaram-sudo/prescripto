import express from "express"
import { addDoctor,loginAdmin ,alldoctors,appointmentsAdmin, Appointmentcancel,adminDashBoard} from "../controller/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js" 
import { changeAvailability } from "../controller/doctorController.js"


const adminRouter = express.Router()

adminRouter.post("/add-doctor",authAdmin,upload.single("image"),addDoctor)
adminRouter.post("/login",loginAdmin)
adminRouter.post("/all-doctors",authAdmin,alldoctors)
adminRouter.post("/change-availability",authAdmin,changeAvailability)
adminRouter.post("/appointments",authAdmin,appointmentsAdmin)
adminRouter.post("/cancel-appointment",authAdmin,Appointmentcancel)
adminRouter.get("/dashboard",authAdmin,adminDashBoard)

export default adminRouter