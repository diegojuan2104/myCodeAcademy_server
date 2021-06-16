const Sequelize = require("sequelize");
const db = require("../config/database");


const ChallengeSubmission = db.define("challengeSubmission", {

    code_solution: {
        type: Sequelize.STRING,
    },  

    date: {
        type: Sequelize.DATE,
    }, 

    answer: {
        type: Sequelize.STRING
    }, 

    challenge_id: {
        type: Sequelize.INTEGER,
    }, 

    user_email: {
        type: Sequelize.STRING
    }
})

module.exports = ChallengeSubmission;