const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");


Product.belongsTo(Category) // --> categoryId
Category.hasMany(Product)


Purchase.belongsTo(User) // --> userId
User.hasMany(Purchase)

Purchase.belongsTo(Product) // --> productId
Product.hasMany(Purchase)


