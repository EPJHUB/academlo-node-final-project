const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');

const getAll = catchError(async(req, res) => {
    const result = await Purchase.findAll()
    return res.json(result)
});

const create = catchError(async(req,res) => {
    
})

module.exports = {
    getAll,
    create
}