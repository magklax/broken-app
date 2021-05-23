require("dotenv").config();

const express = require("express");
const app = express();
const user = require("./controllers/usercontroller");
const game = require("./controllers/gamecontroller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", user);
app.use(require("./middleware/validate-session"));
app.use("/api/game", game);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
