import { it } from "vitest";
import { menuItems as menuModele } from "../modele.js";

export async function listerMenu(req, res) {
    const { category } = req.query;
    const categoriesValides = ["starter", "main", "dessert", "drink"]
    
    if (category !== undefined && !categoriesValides.includes(category)){
        return res.status(400).json({error: {message: "Catégorie invalide."}})
    }

    const items = await menuModele.lister();
    return res.status(200).json(items);
}

export async function trouverItem(req, res) {
    const id = Number(req.params.id);
    const item = await menuModele.trouverParId(id);

    if (!item) {
        return res.status(404).json({error: {message:"Item du menu introuvable."}});
    }

    return res.status(200).json(item);
}

export async function creerItem(req, res) {
    const { name, category, priceCents, available } = req.body;
    const categoriesValides = ["starter", "main", "dessert", "drink"]

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({error: {message: "Le nom est obligatoire."}})
    }

    if (!categoriesValides.includes(category)) {
        return res.status(400).json({error: {message:"Catégorie invalide."}});
    }

    if(!Number.isInteger(priceCents) || priceCents <= 0) {
        return res.status(400).json({error:{message: "Le prix doit être un entier positif"}});
    }

    if (typeof available !== "boolean") {
        return res.status(400).json({error:{message:"La disponibilité doit être true ou false."}});
    }

    const nouvelItem = await menuModele.creer(name.trim(), category, priceCents, available)
    return res.status(201).json(nouvelItem);
}

export async function modiferItem(req, res) {
    const id = Number(req.params.id);
    const item = await menuModele.trouverParId(id)

    if(!item) {
        return res.status(404).json({error: {message:"Item du menu introuvable."}});
    }

    const { name, category, priceCents, available } = req.body;
    const categoriesValides = ["starter", "main", "dessert", "drink"];

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({error:{message:"Le nom est obligatoire."}});
    }

    if (!categoriesValides.includes(category)) {
        return res.status(400).json({error:{messaage:"Catégorie invalide."}});
    }

    if (!Number.isInteger(priceCents) || priceCents <= 0) {
        return res.status(400).json({error:{message:"Le prix doit être un entier positif."}});
    }

    if (typeof available !== "boolean") {
        return res.status(400).json({error:{message:"La disponibilité doit être true ou false."}});
    }

    const itemModifie = await menuModele.modifier(id, name.trim(), category, priceCents, available)
    return res.status(200).json(itemModifie);
}

export async function supprimerItem(req, res) {
    const id = Number(req.params.id);
    const item = await menuModele.trouverParId(id);

    if (!item) {
        return res.status(404).json({error:{message:"Item du menu introuvable."}});
    }

    await menuModele.supprimer(id);
    return res.status(204).send();
}