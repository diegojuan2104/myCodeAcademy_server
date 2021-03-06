const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
    username: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },  

    photo_url: {
        type: Sequelize.STRING
    }, 

    password: {
        type: Sequelize.STRING
    }, 

     description: {
        type: Sequelize.STRING
    }, 
})

module.exports = User;