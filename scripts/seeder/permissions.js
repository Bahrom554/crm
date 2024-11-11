const Models = require('../../schema/main/models');
const permissions = require('../../defaults/permissions.json');

 (async()=>{
    try {
        await Models.permission.destroy({where: {}});
        await Models.permission.bulkCreate(permissions,{ignoreDuplicates: true});
        console.log("permission data seeded successfully");
    } catch (err) {
        console.error("Error seeding permission data:", err);
    }
})();