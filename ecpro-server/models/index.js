const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const Version = require('sequelize-version');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const customOptions = {
  exclude: ['createdAt', 'updatedAt']
}

Version.defaults = customOptions;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.Product = require("../models/Product.model.js")(sequelize, Sequelize);
db.ProductImage = require("./Product_images.model.js")(sequelize, Sequelize);
db.ProductRate = require("./Product_rate.model.js")(sequelize, Sequelize);
db.Category = require("../models/Category.model.js")(sequelize, Sequelize);
db.Cart = require("../models/Cart.model.js")(sequelize, Sequelize);
db.CartItems = require("../models/Cart_items.model")(sequelize, Sequelize);
db.Address = require("../models/Address.model")(sequelize, Sequelize);
db.Order = require("../models/Order.model")(sequelize, Sequelize);
db.OrderItem = require("./Order_Items.model")(sequelize, Sequelize);
db.Comment = require("./Comment.model")(sequelize, Sequelize);
db.HomeSlider = require("./HomeSlider.model")(sequelize, Sequelize);
db.ProductVersion = new Version(db.Product);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasOne(db.Cart, {
  foreignKey: "userId",
  as: "cart",
  onDelete: "CASCADE"
});

db.user.hasMany(db.Address);

db.Product.hasMany(db.ProductImage);

db.Product.hasMany(db.ProductRate);

db.ProductRate.belongsTo(db.Product, {
  foreignKey: 'productId',
  onDelete: 'CASCADE'
});

db.Product.belongsToMany(db.Category, {
  through: 'products_categories',
  foreignKey: 'productId',
  otherKey: 'categoryId',
});

db.Product.belongsToMany(db.Cart, {
  through: db.CartItems,
  foreignKey: 'productId',
  otherKey: 'cartId',
});

db.Product.hasMany(db.Comment);

db.ProductImage.belongsTo(db.Product, {
  onDelete: "CASCADE"
});

db.Cart.belongsToMany(db.Product, {
  through: db.CartItems,
  foreignKey: 'cartId',
  otherKey: 'productId',
});

db.CartItems.belongsTo(db.Cart)

db.Category.hasOne(db.Category, {
  foreignKey: "parentId",
  as: "Category",
  onDelete: "CASCADE"
});

db.Category.hasMany(db.Category, {
  foreignKey: "parentId",
  as: "childs"
});

db.Category.belongsToMany(db.Product, {
  through: 'products_categories',
  foreignKey: 'categoryId',
  otherKey: 'productId'
});

db.Address.belongsTo(db.user, {
  foreignKey: 'userId'
});

db.Order.belongsTo(db.Address, {
  foreignKey: 'addressId'
});

db.Order.belongsTo(db.user, {
  foreignKey: 'userId'
});

db.OrderItem.belongsTo(db.Order);

db.OrderItem.belongsTo(db.Product);

db.Order.hasMany(db.OrderItem);

db.Comment.belongsTo(db.Product, {
  foreignKey: 'productId',
  onDelete: 'CASCADE'
});

db.Comment.belongsTo(db.user, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

db.ROLES = ["user", "admin"];

module.exports = db;