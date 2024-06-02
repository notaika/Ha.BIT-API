const knex = require("knex")(require("../knexfile"));

const getUsers = async (_req, res) => {
    try {
        const data = await knex('user');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`ERROR: Could not retrieve users`);
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await knex.select(
            "id",
            "username",
            "password",
            "created_at"
        )
        .from('user')
        .where('id', id).first();
        
        if (!data) {
            res.sendStatus(404);
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).send(`ERROR: Could not retrieve user`);
    }
}

module.exports = {
    getUsers,
    getUser
};