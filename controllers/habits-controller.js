const knex = require("knex")(require("../knexfile"));

const getHabits = async (req, res) => {
    try {
        const habitsData = await knex('habits').where({ user_id: req.user.id});
        res.status(200).json(habitsData);
    } catch (error) {
        res.status(400).send(`ERROR: Could not retrieve habits data: ${error}`)
    }
}

const postHabit = async (req, res) => {
    const { habit } = req.body;

    try {
        const [ habitId ] = await knex('habits')
            .insert({ 
                user_id: req.user.id, 
                habit 
            });

        const habitItem = await knex('habits')
            .where({ id: habitId })
            .first();

        res.status(200).json(habitItem);
    } catch (error) {
        res.status(400).json(`ERROR: Server Error :(`, {error})
    }
}

const deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHabit = await knex('habits').where({ id, user_id: req.user.id }).del();

        if (!deletedHabit) {
            return res.status(404).send(`ERROR: Habit was not deleted`);
        }
        res.status(200).send((`SUCCESS: Habit was successfully deleted`));
    } catch (error) {
        res.status(500).send(`ERROR: Server Error :(`, {error})
    }
}

const postCompleted = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const { habits_id } = req.body;
     try {
        const completedToday = await knex('habits_completed')
            .where('habits_id', habits_id)
            .andWhere('user_id', req.user.id)
            .andWhere('created_at', today)
            .first();

        if (completedToday) {
            return res.status(400).send('You have already completed this habit today.');
        }

        const habitCompleted = await knex('habits_completed')
            .insert({ user_id: req.user.id, habits_id, created_at: today });
        res.status(200).send(`Habit logged successfully: ${habitCompleted}`)
     } catch (error) {
        res.status(500).send(`ERROR: Could not log habit completion: ${error}`);
     }
}

const getHabitCompletionLogs = async (req, res) => {
    
    try {
        const habitCompletedLogs = await knex('habits_completed')
            .join('habits', 'habits_completed.habits_id', '=', 'habits.id')
            .select('habits_completed.id', 'habits_id', 'habits.habit as habit_name', 'habits_completed.created_at')
            .where('habits_completed.user_id', req.user.id);

        res.status(200).json(habitCompletedLogs);
    } catch (error) {
        res.status(500).send(`ERROR: Unable to retrieve completed habits log: ${error}`)
    }
}

module.exports = {
    getHabits,
    postHabit,
    deleteHabit,
    postCompleted,
    getHabitCompletionLogs
}