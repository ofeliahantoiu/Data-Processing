const pool = require('../config/db');

const getAccounts = async () => {
    return pool.query('SELECT * FROM Account');
};

const createAccount = async (email, password, first_name, last_name) => {
    return pool.query(
        'INSERT INTO Account (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, password, first_name, last_name]
    );
};

module.exports = { getAccounts, createAccount };