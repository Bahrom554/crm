const Constants = require('../../util/constants');
module.exports = async (req, res, next) => {
    try{
         if(req.user.role === Constants.roles.hr){
            next();
         }else{
            throw {statusCode: 403, message: 'Forbidden'}
         }

    }catch(error){
        next(error);
    }
    
};
