const Models = require('../../schema/main/models');
const Util = require('../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    data.forEach(d => {
        d.total_cost = d.count * d.cost;
    });

    await Models.instrument.bulkCreate(data, { ignoreDuplicates: true });
    

}

exports.getAll = async (query) => {

    let search = query.search || null;
    let option = Util.getOptions(query);
    let instrument_query = {};
    let include =[{
        model: Models.file
    }]

    if (option.from && !option.to) {
        instrument_query.created_at = {
            [Op.gte]: moment(option.from, "DD-MM-YYYY").toDate()
        };
    } else if (!option.from && option.to) {
        instrument_query.created_at = {
            [Op.lte]: moment(option.to, "DD-MM-YYYY").toDate()
        };
    } else if (option.from && option.to) {
        instrument_query.created_at = {
            [Op.gte]: moment(option.from, "DD-MM-YYYY").toDate(),
            [Op.lte]: moment(option.to, "DD-MM-YYYY").toDate()
        };
    }

    if (search && (search !== 'null')) {
        instrument_query.name = { [Op.like]: search }
    }


    return Util.getPagination(Models.instrument, instrument_query, option, [], include)
}

exports.getOne = async (id) => {
    return findOne(id);
}


exports.edit = async (id, data) => {
    
    let inst = findOne(id);
    if(data.count || data.cost){
        let count = data.count || inst.count;
        let cost = data.cost || inst.cost;
        data.total_cost = count * cost;
    }

    let [updated, instrument] = await Models.instrument.update(data, { where: { id: id }, returning: true });
    if (!updated) {
        let err = new Error('instrument not found');
        err.statusCode = 404;
        throw err;
    }
   
  

  return instrument[0];
}

exports.delete = async (id) => {
   let intem = await Models.instrument.destroy({where: {id: id}});
   if (!intem) {
    let err = new Error('instrument not found');
    err.statusCode = 404;
    throw err;
}

return { message: 'instrument was deleted successfully.' };
}






async function findOne(id) {

    let item = await Models.instrument.findOne({where: {id: id}, include: {model: Models.file}});
    if (!item) {
        const error = new Error('Instrument not found');
        error.statusCode = 404; // Set the status code
        throw error;
    }

    item.cost = parseFloat(item.cost);
    item.total_cost= parseFloat(item.total_cost);
    return item;
}