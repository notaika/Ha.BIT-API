const knex = require("knex")(require("../knexfile"));

const getHabits = async (_req, res) => {
    try {
        const habitsData = await knex('habits');
        res.status(200).json(habitsData);
    } catch (error) {
        res.status(400).send(`ERROR: Could not retrieve habits data: ${error}`)
    }
}

const getHabit = async (req, res) => {
    const { id } = req.params;

    try {
        const habitData = await knex('habits')
        .select(
            "habits.id",
            "habits.user_id",
            "habits.habit",
            "habits.isCompleted",
            "habits.created_at"
        ).where('id', id).first()
        res.status(200).json(habitData)
    } catch (error) {
        res.status(400).send(`ERROR: Could not retrieve habit data: ${error}`)
    }
}

module.exports = {
    getHabits,
    getHabit
}