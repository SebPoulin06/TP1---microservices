import { Router } from "express";
import { listerOrders, trouverOrder, creerOrder, modifierItemsOrder, calculerFacture } from "../controllers/orderController.js";
import { identifierStaff } from "../middlewares/identifierStaff.js";

const router = Router();

router.get("/", listerOrders);

router.get("/:id", trouverOrder);

router.post("/", identifierStaff, creerOrder);

router.put("/:id/items", identifierStaff, modifierItemsOrder);

router.get("/:id/bill", calculerFacture);

export default router;