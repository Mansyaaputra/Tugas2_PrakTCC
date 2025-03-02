import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Membuat tabel "user"
const Note = db.define(
  "note", // Nama Tabel
  {
    Judul: Sequelize.STRING,
    Deskripsi: Sequelize.STRING,
   
  }
);

db.sync().then(() => console.log("Database synced"));

export default Note;