import { table, table as tableModele } from "../modele.js";  

export async function listerTables (req, res) {
    const { status } = req.query;
    const tables = await tableModele.lister();

    if (status !== undefined && !["free", "occupied"].includes(status)) {
        throw new HttpError(400, "Le statut doit être free ou occupied.");
    }

    res.status(200).json(tables);
}

export async function trouverTable (req ,res) {
    const table = await tableModele.trouverParId(req.params.id);

    if (!table) {
        throw new HttpError(404, "Table introuvable.");
    }

    res.status(200).json(table);
}

export async function creerTable (req, res) {
    const { number, seats } = req.body;

    if (!Number.isInteger(number) || number <= 0 || !Number.isInteger(seats) || seats < 1 || seats > 12) {
        throw new HttpError(400, "Le numéro doit être un entier positif et le nombre de places doit être entre 1 et 12.");
    }

    const nouvelleTable = await tableModele.creer(number, seats);
    res.status(201).json(nouvelleTable);
}

export async function modifierTable(req, res) {
    const id = Number(req.params.id);
    const { number, seats } = req.body;
    const table = await tableModele.trouverParId(id);

    if (!table) {
        throw new HttpError(404, "Table introuvable");
    }
    if (!Number.isInteger(number) || number <= 0 || !Number.isInteger(seats) || seats < 1 || seats > 12) {
        throw new HttpError(400, "Le numéro doit être un entier positif et le nombre de places doit être entre 1 et 12.");
    }

    const tableModifiee = await tableModele.modifier(id, number, seats);
    res.status(200).json(tableModifiee);
}

export async function supprimerTable(req, res) {
    const id = Number(req.params.id);
    const supprimee = await tableModele.supprimer(id);

    if (!supprimee) {
        throw new HttpError(404, "Table introuvable");
    }

    return res.status(204).send();
}

export async function installerClients(req, res) {
    const id = Number(req.params.id);
    const { guests } = req.body;
    const table = await tableModele.trouverParId(id);

    if (!table) {
        throw new HttpError(404, "Table introuvable");
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > table.seats) {
        throw new HttpError(400, "Nombre de clients invalide.");
    }

    if (table.status !== "free") {
        throw new HttpError(400, "Cette table est déjà occupée.");
    }

    if (req.staff.role !== "server") {
        throw new HttpError(403, "Seul un serveur peut installer des clients.");
    }

    const tableOccupee = await tableModele.installer(id, req.staff.id, guests);

    return res.status(200).json(tableOccupee);
}

export async function libererTable(req, res) {
    const id = Number(req.params.id);
    const table = await tableModele.trouverParId(id);

    if (!table) {
        throw new HttpError(404, "Table introuvable.");
    }

    if(table.serverId !== req.staff.id) {
        throw new HttpError(403, "Seul le serveur assigné peut libérer cette table.");
    }

    const tableLiberee = await tableModele.liberer(id);
    return res.status(200).json(tableLiberee);
}