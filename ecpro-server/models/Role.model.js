module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('roles', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Role;
}