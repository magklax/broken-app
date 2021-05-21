require("dotenv").config();

var express = require("express");
var app = express();
const db = require("./db");
var user = require("./controllers/usercontroller");
var game = require("./controllers/gamecontroller");

db.sync();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", user);
app.use(require("./middleware/validate-session"));
app.use("/api/game", game);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
