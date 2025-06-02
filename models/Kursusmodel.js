import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const kursus = db.define("kursus", {
  Judul: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Guru: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Waktu: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  harga: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Img: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Deskripsi: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  Kategori: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,  // supaya nama tabelnya pas 'kursus'
});

export default kursus;
