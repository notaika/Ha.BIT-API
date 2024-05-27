const knex = require("knex")(require("../knexfile"));

const getLevels = async (req, res) => {
    try {
        const data = await knex('levels');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`ERROR: Could not fetch levels`, error);
    }
}

module.exports = {
    getLevels,
    
}