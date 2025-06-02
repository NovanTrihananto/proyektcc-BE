// models/IkutKursus.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Tidak perlu import User atau kursus jika tidak pakai references langsung

const IkutKursus = db.define("ikutkursus", {
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  idKursus: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pembayaran: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "aktif",
  },
}, {
  freezeTableName: true,
});

export default IkutKursus;
