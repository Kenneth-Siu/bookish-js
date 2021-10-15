const express = require("express");
const configuredPassport = require("./configuredPassport");
const bookController = require("./controllers/bookController");
const loginController = require("./controllers/loginController");

const app = express();

app.use(configuredPassport);

app.use("/books", bookController);
app.use("/login", loginController);

app.listen(3000, () => {
    console.log("Bookish is listening on port 3000");
});
