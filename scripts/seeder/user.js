const Models = require('../../schema/main/models');
const config = require('../../config/app')();
const bcrypt = require('bcrypt');

 (async() =>{
   try{
     const passwordHash = await bcrypt.hash(config.userPassword, 10);
     await Models.user.findOne({where: { username: config.userName },
         defaults:{
             firstName: "super",
         lastName: "admin",
         midName: "admin",
         phone: "999999999",
         password: passwordHash,
         role_id: 1
         }});

    console.log("user data seeded successfully");
    } catch(err){
     console.error("Error seeding  data:", err.message);
     throw err;
    }
 
 })();