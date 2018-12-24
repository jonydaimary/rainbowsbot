const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded());

module.exports = client => {
    api.get('/', (req, res) => {
        res.send(`Rainbow\`s System: ${port}`);
    });

    api.get('/api/user/:id', async (req, res) => {
        const user = await client.sequelize.model('users').findByPk(req.param('id'));
        res.json(user
            ? user
            : { error: 'Invalid user ID.' }
        );
    });
    
    api.get('/api/warns/:id', async (req, res) => {
        const warns = await client.sequelize.model('warns').get(req.param('id'));
        res.json(warns
            ? warns
            : { error: 'Invalid user ID.' }
        );
    });

    api.listen(port, () => console.log(`API listening on port: ${port}`));
};