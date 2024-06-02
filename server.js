require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/users');
const levelRoutes = require('./routes/levels')
const spriteRoutes = require('./routes/sprites')
const taskRoutes = require('./routes/tasks');
// const shopRoutes = require('./routes/shop');
// const inventoryRoutes = require('./routes/inventory');

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`public`));

app.use('/api/users', userRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/sprites', spriteRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/api/shop', shopRoutes);
// app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})