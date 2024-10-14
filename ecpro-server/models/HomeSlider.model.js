module.exports = (sequelize, DataTypes) => {
    const HomeSlider = sequelize.define('home_slider', {
        pictureUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        navigationLink: {
            type: DataTypes.STRING,
            allowNull: true
        },
        navigationPage: {
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
    return HomeSlider;
}