import express from "express";
import staffRoutes from "./routes/staffRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


export const app = express();

app.use(express.json());

//routes staff
app.use("/staff", staffRoutes);


//routes tables
app.use("/tables", tableRoutes);


//routes menu
app.use("/menu", menuRoutes);


//routes order
app.use("/order", orderRoutes);