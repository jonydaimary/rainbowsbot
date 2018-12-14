const requireAll = require('require-all');

module.exports = (emitter, dirname) => {
    const dirs = requireAll({ dirname });
    for (const dir in dirs)
        for (const event in dirs[dir])
            emitter.on(dir, dirs[dir][event].bind(undefined, emitter));
};