module.exports = async (client, before, after) => {
    const matchingRole = '469612245744091181';
    const achievment = '470625504035078154';

    if (!before.roles.has(matchingRole) && after.roles.has(matchingRole))
        await after.addRole(achievment);
};