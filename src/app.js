import express from "express";
import { exemple } from "./modele.js";

export const app = express();

app.use(express.json());

app.get("/exemple", async (req, res) => {
    const exemples = await exemple.lister();
    res.json(exemples);
})