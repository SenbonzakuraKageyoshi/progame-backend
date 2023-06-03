import { DataTypes } from "sequelize";
import sequelize from '../db.js';

const Token = sequelize.define('Token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    accessToken: {type: DataTypes.STRING, allowNull: true},
    UserId: {type: DataTypes.INTEGER, allowNull: false}
})

export {
    Token
}