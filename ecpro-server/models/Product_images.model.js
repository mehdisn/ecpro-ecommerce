module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('product_images', {
        pictureUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productId: {
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
    return ProductImage;
}