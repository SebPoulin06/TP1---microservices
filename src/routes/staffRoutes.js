import { Router } from "express";
import { staff } from "../modele.js";
import { listerStaff, trouverStaff, creerStaff } from "../controllers/staffController.js";

const router = Router();

router.get("/", listerStaff)

router.get("/:id", trouverStaff)

router.post("/", creerStaff)

export default router;