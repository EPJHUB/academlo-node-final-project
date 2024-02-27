const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Purchase = require("./Purchase");
const ProductImg = require("./ProductImg");


Product.belongsTo(Category) // --> categoryId
Category.hasMany(Product)

Cart.belongsTo(User) //--> userId
User.hasMany(Cart)

Cart.belongsTo(Product) //--> productId
Product.hasMany(Cart)

Purchase.belongsTo(User) //--> userId
User.hasMany(Purchase)

Purchase.belongsTo(Product) //--> productId
Product.hasMany(Purchase)


ProductImg.belongsTo(Product) // --> productId
Product.hasMany(ProductImg)