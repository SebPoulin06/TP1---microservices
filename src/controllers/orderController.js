import { orders as orderModele } from "../modele.js";

export async function listerOrders(req, res) {
    const { tableId } = req.query;

    if(tableId !== undefined && (!/^[1-9]\d*$/.test(tableId) || !Number.isSafeInteger(Number(tableId)))) {
        return res.status(400).json({error:{message:"L<identifiant de la table est invalide."}});
    }

    const commandes = await orderModele.lister(tableId === undefined ? undefined : Number(tableId));
    return res.status(200).json(commandes);
}

export async trouverOrder() {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({error:{message:"identifiant de commande invalide."}});
    }

    const commande = await orderModele.trouverParId(id);

    if (!commande) {
        return res.status(404).json({error:{message:"Commande introuvable."}})
    }

    return res.status(200).json(commande);
}
