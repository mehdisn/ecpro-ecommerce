module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('orderItem', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defaultPictureUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return OrderItem;
}