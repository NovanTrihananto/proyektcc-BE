import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import kursusroute from "./routes/kursusroute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import ikutkursusroute from "./routes/ikutkursusroute.js";
import "./models/assosiasi.js";

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  cors({
    origin: "", // <- Diganti sama alamat front-end
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(kursusroute);
app.use('/images', express.static('public/images'));
app.use(ikutkursusroute);
app.listen(5000, () => console.log("Server connected"));

