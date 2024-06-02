const knex = require("knex")(require("../knexfile"));

const getSprites = async (_req, res) => {
    try {
        const data = await knex('sprites');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`ERROR: Unable to get sprites`)
    }
}

const getSprite = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await knex.select(
            "id",
            "idle",
            "active"
        )
        .from('sprites')
        .where('id', id).first();

        if (!data) {
            res.sendStatus(404);
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).send(`ERROR: Could not retrieve sprite`);
    }
}

module.exports = {
    getSprites,
    getSprite
}