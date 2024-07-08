const Constants = require('../../utils/constants');
module.exports = async (req, res, next) => {
    try{
         if(req.user.role === Constants.roles.pto){
            console.log("ptorole",req.user.role)
            next();
         }else{
            throw {statusCode: 403, message: 'Forbidden'}
         }

    }catch(error){
        next(error);
    }
    
};
