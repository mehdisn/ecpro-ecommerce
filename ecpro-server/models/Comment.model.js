module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { len: [1, 5] }
        }
    }, {
        scopes: {
            withoutDate: {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
        }
    });
    return Comment;
}