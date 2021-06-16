const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("challenge", {
    title: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING,
    },  
    input: {
        type: Sequelize.STRING
    }, 
    output: {
        type: Sequelize.STRING
    }, 

    difficulty: {
        type: Sequelize.STRING
    }, 
})

module.exports = User;