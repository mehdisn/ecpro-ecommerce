module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
        },
        trackingNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "processing"
        }
    });
    return Order;
}