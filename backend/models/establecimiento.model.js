// establecimiento.model.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');
const connection = mysql.createConnection(dbConfig);
connection.connect(err => { if (err) throw err; });
function registerEstablecimiento(establecimiento, result) {
  const { ID_Establecimiento, Direccion, Codigo_Postal, Nombre_Departamento } = establecimiento;

  connection.query(
    `INSERT INTO establecimientos (ID_Establecimiento, Direccion, Codigo_Postal, Nombre_Departamento)
     VALUES (?, ?, ?, ?)`,
    [ID_Establecimiento, Direccion, Codigo_Postal, Nombre_Departamento],
    (err, res) => {
      if (err) return result(err);
      result(null, { id: res.insertId, ...establecimiento });
    }
  );
}

module.exports = {
  registerEstablecimiento,
};