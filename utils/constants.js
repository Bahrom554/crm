exports.roles = {
    superadmin: 1,
    hr: 2,
    accountant: 3,
    pto: 4,
    mechanic: 5,
    prorab: 6,
    supplier: 7,
    ceo: 8,
    worker: 9
}

exports.defaults = {

    UPLOAD_DIR: './public/uploads'
}

exports.response = {
    page: 1,
    limit: 20
}

exports.xls_types = ['material-estimate','work-estimate']