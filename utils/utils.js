const Models = require('../schema/main/models');
const config = require('../config/app')();
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require("fs");
const rolesPath = path.join(__dirname, "../defaults/roles.json");
const roles = JSON.parse(fs.readFileSync(rolesPath, "utf-8"));
const CONST = require('../utils/constants')

const makePagination = function (data, options, totalDocs) {

    let totalPages = Math.ceil(+totalDocs / options.limit);
    return {
        message: 'Success',
        data: data,
        limit: +options.limit,
        page: +options.page,
        totalPages,
        totalDocs: +totalDocs,
        hasPrevPage: +options.page <= totalPages ? +options.page > 1 : false,
        prevPage: +options.page <= totalPages ? (+options.page - 1 > 0 ? +options.page - 1 : null) : null,
        hasNextPage: +options.page < totalPages,
        nextPage: +options.page + 1 <= totalPages ? +options.page + 1 : null,
    };
};

const getPagination = async function (Model, query, options, order = [], include = []) {
    let result = await Model.findAndCountAll({
        where: query,
        include: include,
        order: order,
        limit: options.limit,
        offset: (options.page - 1) * options.limit,
        distinct: options.distinct,
    });
    return makePagination(result.rows, options, result.count);
};



const getOptions = function (query) {
    let fromDate = query.from;
    let toDate = query.to;
    let limit = query.limit
    let page = query.page
    let data = {}
    if (limit && typeof parseInt(limit) === "number") data.limit = parseInt(limit);
    else data.limit = CONST.response.limit
    if (page && typeof parseInt(page) === "number") data.page = parseInt(page);
    else data.page = CONST.response.page

    if (fromDate && typeof parseInt(fromDate) === "number") {
        data.from = parseInt(fromDate)
    }
    if (toDate && typeof parseInt(toDate) === "number") {
        data.to = parseInt(toDate)
    }
    return data;
}




exports.getPagination = getPagination;
exports.getOptions = getOptions;






exports.seedUser = async function () {
   
   try{
    await seedRoles();
    const passwordHash = await bcrypt.hash(config.userPassword, 10);
    let user = await Models.user.findOne({where: { username: config.userName }});
  if(user){
    await Models.user.update( {
        username: config.userName,
        firstName: "super",
        lastName: "admin",
        midName: "admin",
        phone: "999999999",
        password: passwordHash,
        role_id: 1
},
{where: { username: config.userName }})
}else{
    await Models.user.create({
        username: config.userName,
        firstName: "super",
        lastName: "admin",
        midName: "admin",
        phone: "999999999",
        password: passwordHash,
        role_id: 1
})
}
   } catch(err){
    console.error("Error seeding  data:", err.message);
    throw err;
   }

};

async function seedRoles() {
     if(roles.length > 0){
        // await Models.role.destroy({where: {}});
        await Models.role.bulkCreate(roles, {ignoreDuplicates: true });
     }else if (data.length === 0) {
        console.log("No roles to seed");
      }
     
}