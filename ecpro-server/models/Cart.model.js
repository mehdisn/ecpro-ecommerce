module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        total: {
            type: DataTypes.DECIMAL(65,3),
            allowNull: false,
            defaultValue: 0
        },
        itemsCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        scopes: {
            withoutDate: {
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
          }
    });
    return Cart;
}