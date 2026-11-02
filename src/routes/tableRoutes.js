import { Router } from "express";
import { listerTables, 
    trouverTable, 
    creerTable, 
    modifierTable, 
    supprimerTable, 
    installerClients,
    libererTable } from "../controllers/tableController.js";
import { identifierStaff } from "../middlewares/identifierStaff.js";

const router = Router();

router.get("/", listerTables);

router.get("/:id" , trouverTable);

router.post("/", creerTable);

router.put("/:id", modifierTable);

router.delete("/:id", supprimerTable);

router.post("/:id/seat", identifierStaff, installerClients);

router.post("/:id/release", identifierStaff, libererTable);


export default router;