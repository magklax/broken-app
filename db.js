require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`Error: ${err}`));

sequelize
  .sync()
  .then(() => {
    console.log("DB has been synced");
  })
  .catch((err) => console.log(`Error: ${err}`));

module.exports = sequelize;
