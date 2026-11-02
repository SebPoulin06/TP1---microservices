import { 
    orders as orderModele,
    table as tableModele,
    menuItems as menuModele
 } from "../modele.js";
import { HttpError } from "../errors/HttpError.js";


export async function listerOrders(req, res) {
    const { tableId } = req.query;

    if(tableId !== undefined && (!/^[1-9]\d*$/.test(tableId) || !Number.isSafeInteger(Number(tableId)))) {
        throw new HttpError(400, "L'identifiant de la table est invalide.")
    }

    const commandes = await orderModele.lister(tableId === undefined ? undefined : Number(tableId));
    return res.status(200).json(commandes);
}

export async function trouverOrder(req, res) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        throw new HttpError(400, "identifiant de commande invalide.")
    }

    const commande = await orderModele.trouverParId(id);

    if (!commande) {
        throw new HttpError(404, "Commande introuvable.")
    }

    return res.status(200).json(commande);
}

export async function creerOrder(req, res) {
    const { tableId, items } = req.body;

    const table = await tableModele.trouverParId(tableId);

    if (!table) {
        throw new HttpError(404, "Table introuvable");
    }

    if (table.status !== "occupied") {
        throw new HttpError(400, "La table doit être occupée pour commander.");
    }

    const serveurAssigne = Number(table.serverId);
    const serveurConnecte = Number(req.staff.id);

    if (serveurAssigne !== serveurConnecte) {
        throw new HttpError(403, "Vous n'êtes pas le serveur assigné à cette table.");
    }

    const itemsValides = [];

    for (const item of items) {

        if (!Number.isSafeInteger(item.menuItemId) || item.menuItemId <= 0 || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
            throw new HttpError(400, "Identifiant ou quantité invalide.");
        }

        const produit = await menuModele.trouverParId(item.menuItemId);

        if (!produit) {
            throw new HttpError(404, "Produit introuvable.");
        }

        if (produit.available !== true) {
            throw new HttpError(400, "Ce produit n'est pas disponible.");
        }

        itemsValides.push({
            menuItemId: Number(produit.id),
            name: produit.name,
            quantity: item.quantity,
            unitPriceCents: Number(produit.priceCents)
        });
    }

    if (!Array.isArray(items) || items.length < 1 || items.length > 20) {
        throw new HttpError(400, "La commande doit contenir entre 1 et 20 lignes.");
    }

    const nouvelleCommande = await orderModele.creer(Number(tableId), Number(req.staff.id), itemsValides);

    return res.status(201).json(nouvelleCommande);
}


export async function modifierItemsOrder(req, res) {
    const id = Number(req.params.id);
    const commande = await orderModele.trouverParId(id);

    if (!commande) {
        throw new HttpError(404, "Commande introuvable.");
    }

    const table = await tableModele.trouverParId(Number(commande.tableId));

    if (!table) {
        throw new HttpError(404, "Table introuvable.");
    }

    if (table.status !== "occupied") {
        throw new HttpError(400, "La table doit être occupée.");
    }

    if (Number(table.serverId) !== Number(req.staff.id)) {
        throw new HttpError(403, "Vous n'êtes pas le serveur assigné à cette table.");
    }

    const { items } = req.body;

    if (!Array.isArray(items) || items.length < 1 || items.length > 20) {
        throw new HttpError(400, "La commande doit contenir entre 1 et 20 produits.");
    }

    const itemsValides = [];

    for (const item of items) {

        if (!item || !Number.isSafeInteger(item.menuItemId) || item.menuItemId <= 0 || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
            throw new HttpError(400, "Identifiant ou quantité invalide.");
        }

        const produit = await menuModele.trouverParId(item.menuItemId);

        if (!produit) {
            throw new HttpError(404, "Produit introuvable.");
        }

        if (produit.available !== true) {
            throw new HttpError(400, "Ce produit n'est pas disponible.");
        }

        itemsValides.push({
            menuItemId: Number(produit.id),
            name: produit.name,
            quantity: item.quantity,
            unitPriceCents: Number(produit.priceCents)
        });
    }

    const commandeModifiee = await orderModele.modifierItems(id, itemsValides);
    return res.status(200).json(commandeModifiee);
}

export async function calculerFacture(req, res) {
    const id = Number(req.params.id);
    const commande = await orderModele.trouverParId(id);

    if (!commande) {
        throw new HttpError(404, "Commande introuvable.");
    }

    const items = typeof commande.items === "string" ? JSON.parse(commande.items) : commande.items;
    let subtotalCents = 0;

    for (const item of items) {
        subtotalCents += item.quantity * item.unitPriceCents;
    }

    const tpsCents = Math.round(subtotalCents * 0.05);
    const tvqCents = Math.round(subtotalCents * 0.09975);
    const totalCents = subtotalCents + tpsCents + tvqCents;

    return res.status(200).json({
        orderId: Number(commande.id),
        subtotalCents,
        tpsCents,
        tvqCents,
        totalCents
    });
}