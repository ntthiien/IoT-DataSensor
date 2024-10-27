const express=require("express");
const database=require("./config/database");
const MQTT=require("./config/mqtt");
const cors= require("cors");
require("dotenv").config();
const routesApi=require("./api/routes/index.route");
const app =express();
const port =process.env.PORT;
const bodyParser = require('body-parser');

// database.connect();
// MQTT.mqtt();

app.use(cors());
app.use(bodyParser.json());
database.connect();
// MQTT.mqtt();
// router api
routesApi(app);
MQTT.mqtt();

app.listen(port,()=>{
    console.log(`app listen on port ${port}`);
})