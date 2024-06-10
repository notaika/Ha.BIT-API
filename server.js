require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/users');
const levelRoutes = require('./routes/levels')
const spriteRoutes = require('./routes/sprites')
const taskRoutes = require('./routes/tasks');
const habitRoutes = require('./routes/habits')

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`public`));

app.use('/api/users', userRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/sprites', spriteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})