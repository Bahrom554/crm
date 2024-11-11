const Models = require('../../schema/main/models');
const roles = require('../../defaults/roles.json');


(async () => {
    if (roles.length > 0) {
        let _roles = [];
        for (let i = 0; i < roles.length; i++) {
            let { id, data } = roles[i];
            let role = await Models.role.findByPk(id);
            if (role) {
                await Models.role.update({ ...data }, { where: { id: id } });
            } else {
                _roles.push(roles[i]);
            }
        }
        await Models.role.bulkCreate(_roles, { ignoreDuplicates: true });
        console.log("role data seeded successfully");
    } else if (roles.length === 0) {
        console.log("No roles to seed");
    }

})();