import { DataTypes } from "sequelize";
import sequelize from '../db.js';
import { User } from "./user.js";

const Course = sequelize.define('Course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    teacher: {type: DataTypes.STRING, allowNull: false},
    shedule: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.STRING, allowNull: false},
    features: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    closedPlaces: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    places: {type: DataTypes.INTEGER, allowNull: false},
});

export {
    Course,
}