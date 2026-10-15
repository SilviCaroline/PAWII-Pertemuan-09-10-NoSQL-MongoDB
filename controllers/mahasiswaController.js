// Mini Project - Pertemuan 9-10: Controller Mahasiswa
// TODO 2: lengkapi setiap handler agar memanggil Model Mongoose yang sesuai.

const Mahasiswa = require("../models/mahasiswaModel");

exports.getAll = async (req, res) => {
  try {
    // Ambil seluruh data dengan Mahasiswa.find(), sertakan .populate('prodiId')
    const data = await Mahasiswa.find().populate("prodiId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    // Ambil satu data dengan Mahasiswa.findById(req.params.id).populate('prodiId')
    const data = await Mahasiswa.findById(req.params.id).populate("prodiId");
    if (!data) return res.status(404).json({ message: "Tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Buat data baru dengan Mahasiswa.create(req.body)
    const mahasiswa = await Mahasiswa.create(req.body);
    res.status(201).json(mahasiswa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ message: "Tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const data = await Mahasiswa.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Tidak ditemukan" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};