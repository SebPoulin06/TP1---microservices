import { Router } from "express";
import {
    listerMenu,
    trouverItem,
    creerItem,
    modiferItem,
    supprimerItem
} from "../controllers/menuController.js";


const router = Router();


router.get("/", listerMenu);

router.get("/:id", trouverItem);

router.post("/", creerItem);

router.put("/:id", modiferItem);

router.delete("/:id", supprimerItem);


export default router;