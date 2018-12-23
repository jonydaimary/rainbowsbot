const requireAll = require('require-all');

module.exports = (emitter, dirname) => {
    const dirs = requireAll({ dirname });
    for (const dir in dirs)
        for (const filename in dirs[dir])
            emitter.on(dir, dirs[dir][filename].bind(undefined, emitter));
};