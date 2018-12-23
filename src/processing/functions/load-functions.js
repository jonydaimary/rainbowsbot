const requireAll = require('require-all');

module.exports = (object, dirname) => {
    const dir = requireAll({ dirname });
    for (const filename in dir)
        object[filename] = dir[filename].bind(undefined, object);
};