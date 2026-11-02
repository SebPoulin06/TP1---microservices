import { HttpError } from "../errors/HttpError.js";

export function gestionErreurs(err, req, res, next) {

    if (err instanceof HttpError) {
        return res.status(err.status).json({error: {message: err.message, ...(err.details !== undefined && { details: err.details })}});
    }

    console.error(err);

    return res.status(500).json({error: {message: "Une erreur interne est survenue."}});
}