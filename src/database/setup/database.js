const { Sequelize } = require("sequelize");

const  { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env

const todoSequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host:DB_HOST,
    dialect:"mysql"
})

module.exports = todoSequelize;