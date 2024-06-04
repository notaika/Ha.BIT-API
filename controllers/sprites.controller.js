const knex = require("knex")(require("../knexfile"));
const fs = require('fs');

const getSprites = async (_req, res) => {
    try {
        const spritesData = JSON.parse(fs.readFileSync('./data/sprites.json'))
        res.status(200).json(spritesData);
    } catch (error) {
        res.status(400).send(`ERROR: Unable to get sprites: ${error}`)
    }
}

const editCost = async (req, res) => {
    const { id } = req.body; 
    try {
        const spritesData = JSON.parse(fs.readFileSync('./data/sprites.json'));
        
        const spriteList = spritesData.player_sprites
        const spriteIndex = spriteList.findIndex(sprite => sprite.id === id);

        if (spriteIndex !== -1) {
            spriteList[spriteIndex].cost = 0;
            fs.writeFileSync('./data/sprites.json', JSON.stringify(spritesData, null, 2));
            res.status(200).json(spriteList[spriteIndex]);
        } else {
            res.status(404).send('Sprite not found');
        }
    } catch (error) {
        res.status(400).send(`ERROR: Unable to update cost: ${error}`);
    }
}

module.exports = {
    getSprites,
    editCost
}