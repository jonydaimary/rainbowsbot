const express = require('express');

const PORT = process.env.PORT || 3000;

const api = express();

module.exports = client => {
    api.get('/user:id', async (req, res) => {
        const user = await client.sequelize.model('users').findByPk(req.param('id'));
        res.json(user
            ? user
            : { error: 'Invalid user ID.' }
        );
    });

    api.get('/warns:id', async (req, res) => {
        const warns = await client.sequelize.model('warns').get(req.param('id'));
        res.json(warns
            ? warns
            : { error: 'Invalid user ID.' }
        );
    });

    api.listen(PORT, () => console.log(`API listening on port: ${PORT}`));
};