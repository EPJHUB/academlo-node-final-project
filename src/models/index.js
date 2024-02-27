const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Purchase = require("./Purchase");


Product.belongsTo(Category) // --> categoryId
Category.hasMany(Product)
