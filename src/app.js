import express from "express";
import staffRoutes from "./routes/staffRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
<<<<<<< HEAD
=======
import orderRoutes from "./routes/orderRoutes.js";
import { gestionErreurs } from "./middlewares/gestionErreurs.js";
>>>>>>> origin/master


export const app = express();

app.use(express.json());

//routes staff
app.use("/staff", staffRoutes);


//routes tables
app.use("/tables", tableRoutes);


//routes menu
<<<<<<< HEAD
app.use("/menu", menuRoutes);
=======
app.use("/menu", menuRoutes);


//routes order
app.use("/order", orderRoutes);


//gestien d'erreurs
app.use(gestionErreurs);
>>>>>>> origin/master
