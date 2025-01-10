const pool = require('../config/db');

exports.getAccounts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Account');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createAccount = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Account (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, password, first_name, last_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};