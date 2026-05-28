const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  categoria: { type: String }
}, {timestamps: true });

module.exports = mongoose.model('Producto', ProductoSchema);