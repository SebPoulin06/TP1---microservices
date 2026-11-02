import { staff } from "../modele.js"

export async function identifierStaff(req, res, next) {
    const staffId = req.get("X-Staff-Id");

    if (!staffId || !/^[0-9]+$/.test(staffId) || !Number.isSafeInteger(Number(staffId))){
        return res.status(401).json({error: {message: "Identifiant du personnel invalide."}})
    }

    try {
        const employe = await staff.trouverParId(Number(staffId));
        if (!employe) {
            return res.status(401).json({error: {message: "Employé introuvable."}});
        }

        req.staff = employe;

        next();
    } catch (erreur) {
        next(erreur);
    }

}