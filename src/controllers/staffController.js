import { staff } from "../modele.js";

export async function listerStaff (req, res) {
    const employes = await staff.lister();

    res.status(200).json(employes);
} 

export async function trouverStaff (req, res) {
    const employes = await staff.trouverParId(req.params.id);
    
    if (!employes) {
<<<<<<< HEAD
        return res.status(404).json({
            error:{code:"NOT_FOUND", message: "Employé introuvable"}
        })
=======
        throw new HttpError(404, "Employé introuvable.");
>>>>>>> origin/master
    }

    res.status(200).json(employes);
}

export async function creerStaff (req, res) {
    const { name, role } = req.body;

    console.log("Body reçu :", req.body);

    if(typeof name !== "string" || name.trim() === "" || !["server", "kitchen"].includes(role)){
<<<<<<< HEAD
        return res.status(400).json({error: {message: "Nom ou rôle invalide."}});
=======
        throw new HttpError(400, "Nom ou rôle invalide.");
>>>>>>> origin/master
    }

    const employe = await staff.creer(name.trim(), role);

    res.status(200).json(employe);
}