const db = require('../config/database');

// Obtener todos
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alumnos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alumnos WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear
exports.create = async (req, res) => {
  try {
    const { nombre, apellido, edad } = req.body;
    const [result] = await db.query(
      'INSERT INTO alumnos (nombre, apellido, edad) VALUES (?, ?, ?)',
      [nombre, apellido, edad]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const { nombre, apellido, edad } = req.body;
    await db.query(
      'UPDATE alumnos SET nombre = ?, apellido = ?, edad = ? WHERE id = ?',
      [nombre, apellido, edad, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM alumnos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Alumno eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};