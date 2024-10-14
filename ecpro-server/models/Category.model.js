module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pictureUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        scopes: {
            withoutDate: {
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
          }
    });
    return Category;
}