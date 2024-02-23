const { getAll, create, remove } = require('../controllers/category.controller');
const express = require('express');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(getAll)
    .post(create);

routerCategory.route('/:id')
    .delete(remove)

module.exports = routerCategory;