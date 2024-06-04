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
            "created_at",
            "reputation",
            "sprites_id",
            "coins"
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

const addCoins = async (req, res) => {
    const {id, addedCoins } = req.body;

    if (!id || addedCoins === undefined) {
        return res.status(400).send(`ERROR: User ID and added coins are required`);
    }

    if (isNaN(addedCoins)) {
        return res.status(400).send(`ERROR: addedCoins must be a number`);
    }

    const user = await knex('user').where('id', id).first();
        if (!user) {
            return res.status(400).send(`ERROR: User ID and added coins are required`)
        }

    try {
        const newBalance = user.coins + addedCoins;
        await knex('user').where('id', id).update({ coins: newBalance })

        res.status(200).json({ coins: newBalance })
    } catch (error) {
        res.status(500).send(`ERROR: Could not update inventory item: ${error}`)
    }
}

const addReputation = async (req, res) => {
    const { id, addedReputation } = req.body;

    if (!id || addedReputation === undefined) {
        return res.status(400).send(`ERROR: User ID and added reputation are required`);
    }

    if (isNaN(addedReputation)) {
        return res.status(400).send(`ERROR: addedReputation must be a number`);
    }

    const user = await knex('user').where('id', id).first();
        if (!user) {
            return res.status(400).send(`ERROR: User ID and added reputation are required`)
        }

    try {
        const newRep = user.reputation + addedReputation;
        await knex('user').where('id', id).update({ reputation: newRep })

        res.status(200).json({ reputation: newRep })
    } catch (error) {
        res.status(500).send(`ERROR: Could not update reputation: ${error}`)
    }
}

module.exports = {
    getUsers,
    getUser,
    addCoins,
    addReputation,
};