import { staff } from "../modele.js";

export async function listerStaff (req, res) {
    const employes = await staff.lister();

    res.status(200).json(employes);
} 

export async function trouverStaff (req, res) {
    const employes = await staff.trouverParId(req.params.id);
    
    if (!employes) {
        return res.status(404).json({
            error:{code:"NOT_FOUND", message: "Employé introuvable"}
        })
    }

    res.status(200).json(employes);
}

export async function creerStaff (req, res) {
    const { name, role } = req.body;

    console.log("Body reçu :", req.body);

    if(typeof name !== "string" || name.trim() === "" || !["server", "kitchen"].includes(role)){
        return res.status(400).json({error: {message: "Nom ou rôle invalide."}});
    }

    const employe = await staff.creer(name.trim(), role);

    res.status(200).json(employe);
}