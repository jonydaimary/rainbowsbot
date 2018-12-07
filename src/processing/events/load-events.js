const requireAll = require('require-all');

module.exports = (emitter, eventDirectory) => {
    const dirs = requireAll({ dirname: eventDirectory });
    for (const dir in dirs)
        for (const event in dirs[dir])
            emitter.on(dir, dirs[dir][event].bind(undefined, emitter));
};