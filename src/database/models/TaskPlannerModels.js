const { DataTypes } = require("sequelize")
const todoSequelize = require("../setup/database")

todoSequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const TaskPlannerModel = todoSequelize.define(
    "Todo",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        task:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        completed:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        doBefore:{
            type:DataTypes.DATE,
            allowNull:false,
        },
    },
    { tableName:"todosplanner" }
);

todoSequelize.sync().then(() =>{
    console.log("Table is created successfully");
}).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = TaskPlannerModel;