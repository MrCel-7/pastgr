import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = express.Router();

router.get("/", verifyToken, checkRole("master"), getUsers);
router.put("/:id", verifyToken, checkRole("master"), updateUser);
router.delete("/:id", verifyToken, checkRole("master"), deleteUser);

export default router;
