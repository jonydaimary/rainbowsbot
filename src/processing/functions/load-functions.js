const requireAll = require('require-all');

module.exports = (object, dirname) => {
    const dir = requireAll({ dirname });
    for (const fn in dir)
        object[fn] = dir[fn].bind(undefined, object);
};