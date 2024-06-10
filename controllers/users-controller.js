const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// User creation, login and authentication
const userSignup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await knex('user').where({ username }).first();

        if (existingUser) {
            return res.status(400).send(`ERROR: A user with that username already exists`)
        }

        const encrypted = bcrypt.hashSync(password);

        await knex('user').insert({ username, password: encrypted });
        res.status(201).json({ success:true });
    } catch (error) {
        res.status(500).send(`ERROR: Unable to sign-up with these credentials ${error}`);
    }
}

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await knex('user').where({ username }).first();

        if (!user) {
            return res.status(400).send("Username or password is incorrect");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send("Username or password is incorrect");
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET);

        res.json({ token })
    } catch (error) {
        res.status(401).send("Login failed");
    }
}

const getProfile = async (req, res) => {
    res.json(req.user);
}

const authorize = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        console.error("Authorization header is missing");
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        console.error("Token is missing");
        return res.status(401).json({ error: "Token is missing" });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        const user = await knex("user").select("id", "username", "reputation", "created_at", "coins").where({ id }).first();

        if (!user) {
            console.error("User not found");
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Invalid token", error);
        res.status(400).json({ error: "Invalid token" });
    }
};


// API Calls
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

// const subtractCoins = async (req, res) => {
//     const {id, minusCoins } = req.body;

//     if (!id || minusCoins === undefined) {
//         return res.status(400).send(`ERROR: User ID and added coins are required`);
//     }

//     if (isNaN(minusCoins)) {
//         return res.status(400).send(`ERROR: addedCoins must be a number`);
//     }

//     const user = await knex('user').where('id', id).first();
//         if (!user) {
//             return res.status(400).send(`ERROR: User ID and subtracted coins are required`)
//         }

//     try {
//         const newBalance = user.coins - minusCoins;
//         await knex('user').where('id', id).update({ coins: newBalance })

//         res.status(200).json({ coins: newBalance })
//     } catch (error) {
//         res.status(500).send(`ERROR: Could not update inventory item: ${error}`)
//     }
// }

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
    // subtractCoins,
    userSignup,
    userLogin,
    getProfile,
    authorize
};