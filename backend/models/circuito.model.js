// circuito.model.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');
const connection = mysql.createConnection(dbConfig);
connection.connect(err => { if (err) throw err; });
function registerCircuito(circuito, result) {
  const { Numero_Circuito, EsAccesible, Circuito_Serie, Numero_Inicio, Numero_Fin, ID_Establecimiento } = circuito;

  connection.query(
    `INSERT INTO circuitos (Numero_Circuito, EsAccesible, Circuito_Serie, disponible, Numero_Inicio, Numero_Fin, ID_Establecimiento)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [Numero_Circuito, EsAccesible, Circuito_Serie, Numero_Inicio, Numero_Fin, ID_Establecimiento],
    (err, res) => {
      if (err) return result(err);
      result(null, { id: res.insertId, ...circuito });
    }
  );
}

module.exports = {
  registerCircuito,
};