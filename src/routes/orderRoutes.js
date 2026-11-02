import { Router } from "express";
import { listerOrders, trouverOrder } from "../controllers/orderController.js";

const router = Router();

router.get("/", listerOrders);

router.get("/:id", trouverOrder);

export default router;
