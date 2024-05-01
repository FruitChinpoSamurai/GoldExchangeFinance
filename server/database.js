const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "allisgood", // "goldexchangeman",
    port: 5432,
    database: "goldbuysell"
});

module.exports = pool;