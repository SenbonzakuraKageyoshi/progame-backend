import { DataTypes } from "sequelize";
import sequelize from '../db.js';
import { User } from "./user.js";

const Course = sequelize.define('Course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Не начат'},
    teacher: {type: DataTypes.STRING, allowNull: false},
    shedule: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.STRING, allowNull: false},
    features: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    closedPlaces: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    places: {type: DataTypes.INTEGER, allowNull: false},
    dateStart: {type: DataTypes.STRING, allowNull: false},
    dateEnd: {type: DataTypes.STRING, allowNull: false},
});

const StudentCourse = sequelize.define('StudentCourse', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});

Course.belongsToMany(User, { through: StudentCourse });
User.belongsToMany(Course, { through: StudentCourse });

StudentCourse.belongsTo(User);
StudentCourse.belongsTo(Course);

export {
    Course,
    StudentCourse
}