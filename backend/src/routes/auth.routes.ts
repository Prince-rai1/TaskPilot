import { Router } from "express";
import { registerController, loginController, logoutController, getUserController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addEmployeeController, getAllEmployeesController, getSingleEmployeeController, updateEmployeeStatusController } from "../controllers/employee.controller.js";


const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.get("/me", authenticate, getUserController);

router.post("/create-employee", authenticate, addEmployeeController);
router.get("/all-employees", authenticate, getAllEmployeesController);
router.get("/employee/:id", authenticate, getSingleEmployeeController);
router.patch("/employee/:id/status", authenticate, updateEmployeeStatusController);

export default router;
