const mysql = require('mysql2/promise');
(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass', 
    database: 'testdb',
    },
  );

  console.log('Conexión exitosa');
  await connection.end();
})();
const dbConfig = require('../config/db.config');
const connection = mysql.createConnection(dbConfig);
connection.connect(err => { if (err) throw err; });
function registerDepartamento(departamento, result) {
  const { Nombre } = departamento;

  connection.query(
    `INSERT INTO departamentos (Nombre)
     VALUES (?)`,
    [Nombre],
    (err, res) => {
      if (err) return result(err);
      result(null, { id: res.insertId, ...departamento });
    }
  );
}

module.exports = {
  registerDepartamento,
};