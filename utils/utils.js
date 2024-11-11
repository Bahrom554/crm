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


