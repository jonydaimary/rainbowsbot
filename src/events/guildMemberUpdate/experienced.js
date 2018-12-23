const ELDER = '469612245744091181';
const EXPERIENCED = '470625504035078154';

module.exports = async (client, before, after) => {
    if (!before.roles.has(ELDER) && after.roles.has(ELDER))
        await after.addRole(EXPERIENCED);
};