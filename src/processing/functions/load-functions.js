const requireAll = require('require-all');

module.exports = (object, dirname) => {
    const dir = requireAll({ dirname });
    for (const fn in dir)
        object.prototype[fn] = dir[fn].bind(undefined, object);
};