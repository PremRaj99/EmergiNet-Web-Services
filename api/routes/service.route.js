import express from "express";
import {
  deleteServices,
  getService,
  getServices,
  registerServices,
  updateServices,
} from "../controllers/service.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/register/:userId", verifyToken, registerServices);
router.put("/update/:userId", verifyToken, updateServices);
router.delete("/delete/:userId", verifyToken, deleteServices);
router.get("/getservices", verifyToken, getServices);
router.get("/:userId", getService);

export default router;
