import { DataTypes } from "sequelize";
import sequelize from '../db.js';

const Request = sequelize.define('Request', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    UserId: {type: DataTypes.INTEGER, allowNull: true},
    CourseId: {type: DataTypes.INTEGER, allowNull: true},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'На рассмотрении'},
    text: {type: DataTypes.STRING, allowNull: false},
    telephone: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
})

export {
    Request
}