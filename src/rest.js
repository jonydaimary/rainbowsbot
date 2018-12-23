const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const api = express();
api.use(bodyParser.json());

require('./dbinit').then(sequelize => {
    api.get('/user:id', async (req, res) => {
        const user = await sequelize.model('users').findByPk(req.param('id'));
        res.json(user
            ? user
            : { error: 'Invalid user ID.' }
        );
    });
    
    api.get('/warns:id', async (req, res) => {
        const warns = await sequelize.model('warns').get(req.param('id'));
        res.json(warns
            ? warns
            : { error: 'Invalid user ID.' }
        );
    });

    api.listen(PORT, () => console.log(`API listening on port: ${PORT}`));
});