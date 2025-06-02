// controllers/IkutKursusController.js
import IkutKursus from "../models/ikutkursusmodel.js";
import kursus from "../models/Kursusmodel.js";
import User from "../models/UserModel.js";


export const getAllIkutKursus = async (req, res) => {
  try {
    // Ambil semua data ikut kursus, bisa sekaligus include relasi User dan Kursus
    const data = await IkutKursus.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: kursus, as: "kursus", attributes: ["id", "Judul", "Guru"] },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil data ikut kursus" });
  }
};

// GET semua kursus yang diikuti user
export const getKursusDiikuti = async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await IkutKursus.findAll({
  where: { idUser: userId },
  include: [
    {
      model: kursus,
      as : "kursus",
      attributes: ["id", "Judul", "Guru", "Waktu", "harga", "Img", "Deskripsi", "Kategori"],
    },
  ],
});


    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


    // UPDATE data ikut kursus (misal update pembayaran)
export const updateIkutKursus = async (req, res) => {
  try {
    const { id } = req.params; // id record ikutkursus yang mau diupdate
    const { pembayaran, idUser, idKursus,status } = req.body; // field yang ingin diupdate

    // Cek dulu data ikutkursus berdasarkan id
    const ikutKursus = await IkutKursus.findByPk(id);

    if (!ikutKursus) {
      return res.status(404).json({ msg: "Data ikut kursus tidak ditemukan" });
    }

    // Update fields yang dikirim, kalau ada
    if (pembayaran !== undefined) ikutKursus.pembayaran = pembayaran;
    if (idUser !== undefined) ikutKursus.idUser = idUser;
    if (idKursus !== undefined) ikutKursus.idKursus = idKursus;
    if (status !== undefined) ikutKursus.status = status;
    await ikutKursus.save();

    res.json({ msg: "Data berhasil diupdate", data: ikutKursus });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// POST daftar kursus
export const daftarKursus = async (req, res) => {
  try {
    console.log("BODY:", req.body); // cek apa yang diterima backend
    const { idUser, idKursus, pembayaran,status: kursusStatus } = req.body;

    if (!idUser || !idKursus) {
      return res.status(400).json({ msg: "idUser dan idKursus wajib diisi" });
    }

    const existing = await IkutKursus.findOne({
      where: { idUser, idKursus },
    });

    if (existing) {
      return res.status(400).json({ msg: "Kursus ini sudah diikuti" });
    }

    const newData = await IkutKursus.create({
      idUser,
      idKursus,
      pembayaran: pembayaran || "pending",
      status: kursusStatus || "aktif", // tambahkan ini
    });

    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// (Opsional) DELETE batal ikut
export const batalIkut = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await IkutKursus.destroy({
      where: { id },
    });

    if (!deleted) return res.status(404).json({ msg: "Data tidak ditemukan" });

    res.json({ msg: "Berhasil dibatalkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
