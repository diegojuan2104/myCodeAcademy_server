const Sequelize = require("sequelize");
require("dotenv").config({ path: "variables.env" });

module.exports = new Sequelize({
  database: process.env.DATABASE_NAME_DB,
  username: process.env.USER_NAME_DB,
  password: process.env.USER_PASSWORD_DB,
  host: process.env.HOST_DB,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
  define: {
    timestamps: false,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
