module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('cart_items', {
        cartId: {
            type: DataTypes.INTEGER,
            field: 'cartId',
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            field: 'productId',
            allowNull: false,
            unique: false
        },
        qty: {
            type: DataTypes.INTEGER,
            field: 'qty',
            allowNull: false,
            defaultValue: 1
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false
        },
        defaultPictureUrl: {
            type: DataTypes.STRING,
            field: 'defaultPictureUrl',
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(65, 3),
            field: 'price',
            allowNull: false
        },
        version_id: {
            type: DataTypes.INTEGER,
            field: 'version_id',
            allowNull: false,
        },
        version_type: {
            type: DataTypes.INTEGER,
            field: 'version_type',
            allowNull: false,
        },
    }, {
        scopes: {
            withoutDate: {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
        }
    });
    return CartItem;
}