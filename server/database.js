const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "goldexchangeman",
    port: 5432,
    database: "goldbuysell"
});

module.exports = pool;