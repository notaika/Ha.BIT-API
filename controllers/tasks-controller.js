const knex = require("knex")(require("../knexfile"));

const getTasks = async (req, res) => {
    try {
        const data = await knex('tasks').where('user_id', req.user.id);
        res.status(200).json(data);
    } catch {
        res.status(400).send(`ERROR: Could not retrieve users`);
    }
};

const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await knex('tasks').where('id', id).andWhere('user_id', req.user.id).first();
        if (!data) {
            res.sendStatus(400);
        } else {
            res.status(200).json(data);
        }
    } catch(error) {
        res.status(400).send(`ERROR: Could not retrive task`)
    }
};

const addTask = async (req, res) => {
    if (!req.body || !req.body.task || !!req.body.isCompleted || !req.body.user_id || !!req.body.id) {
        return res.sendStatus(400)
    }
    try {
        const newTask = {
            user_id: req.body.user_id,
            task: req.body.task,
            isCompleted: req.body.isCompleted || false
        }

        const taskIds = await knex('tasks').insert(newTask);
        const data = await knex('tasks').where('id', taskIds[0]).first();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).send(`ERROR: Could not retrieve tasks`)
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await knex('tasks').where('id', id).del();
        res.status(200).json(data);
    } catch(error) {
        res.status(400).send(`ERROR: Count not retrieve tasks`)
    }
};

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    getTask,
}