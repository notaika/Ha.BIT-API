const knex = require("knex")(require("../knexfile"));
const sprites = require('../data/player_sprites.json');
const fs = require('fs');

const getSprites = async (_req, res) => {
    try {
        const spritesData = JSON.parse(fs.readFileSync('./data/player_sprites.json'))
        res.status(200).json(spritesData);
    } catch (error) {
        res.status(400).send(`ERROR: Unable to get sprites: ${error}`)
    }
}

const getUserSprites = async (req, res) => {
    const userId = req.user.id;
    try {
        const userSprites = await knex('user_sprites')
            .where('user_id', userId)
            .select('sprite_id', 'isOwned');

        const allSprites = JSON.parse(fs.readFileSync('./data/player_sprites.json'));

        const mergedSprites = allSprites.map(sprite => {
            const userSprite = userSprites.find(us => us.sprite_id === sprite.id);
            return {
                ...sprite,
                isOwned: userSprite ? userSprite.isOwned : false
            };
        });

        res.status(200).json(mergedSprites);
    } catch (error) {
        console.error(`ERROR: Could not retrieve user sprites: ${error}`);
        res.status(500).send(`ERROR: Could not retrieve user sprites: ${error}`);
    }
};

  const purchaseSprite = async (req, res) => {
    const { sprite_id } = req.body;
    const userId = req.user.id;

    try {
        const sprite = sprites.find(s => s.id === sprite_id);
        const user = await knex('user').where('id', userId).first();

        if (!sprite || !user) {
            return res.status(400).send(`ERROR: Sprite or user not found`);
        }

        if (user.coins < sprite.cost) {
            return res.status(400).send(`ERROR: Not enough coins`);
        }

        const userSprite = await knex('user_sprites').where({ user_id: userId, sprite_id }).first();

        if (userSprite) {
            return res.status(400).send(`ERROR: Sprite already owned`);
        }

        await knex('user_sprites').insert({ user_id: userId, sprite_id, isOwned: true });
        const newBalance = user.coins - sprite.cost;
        await knex('user').where('id', userId).update({ coins: newBalance });

        res.status(200).json({ newBalance });
    } catch (error) {
        res.status(500).send(`ERROR: Could not purchase sprite`);
    }
};

module.exports = {
    getSprites,
    getUserSprites,
    purchaseSprite
}