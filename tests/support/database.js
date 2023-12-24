const { Pool } = require("pg");
const DbConfig = {
  user: "zkdnjsom",
  host: "silly.db.elephantsql.com",
  database: "zkdnjsom",
  password: "6bAvsF8DKRQARqdAUHGUonW8mrFpL_tG",
  port: 5432,
};

export async function executeSQL(sqlScript) {
  try {
    const pool = new Pool(DbConfig);
    const client = await pool.connect();
    const result = await client.query(sqlScript);
    console.log(result.rows);
  } catch (error) {
    console.log("Erro ao executar sql " + error);
  }
}
