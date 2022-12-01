const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || port);
