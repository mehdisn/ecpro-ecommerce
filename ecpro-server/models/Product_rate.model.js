module.exports = (sequelize, DataTypes) => {
    const ProductRate = sequelize.define('product_rates', {
        productId: {
            type: DataTypes.INTEGER,
            field: 'productId',
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userId',
            allowNull: false
        },
        rate: {
            type: DataTypes.DECIMAL(1, 1),
            field: 'rate',
            allowNull: false
        },
    }, {
        scopes: {
            withoutDate: {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
        }
    });
    return ProductRate;
}