const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AppRouter } = require("./src/routes");
const todoSequelize = require("./src/database/setup/database");
//AWS lambda
//const serverless = require('serverless-http');

const { PORT } = process.env

const app = express();
app.use(bodyParser.json());

app.use(cors());

todoSequelize.sync()
    .then(()=>{
        console.log("DB has been initialized")
    })
    .catch((e)=>{
        console.log("An error occurred while initializing the DB:", e);
    })

app.use("/V1", AppRouter);


app.listen(PORT,()=> {
    console.log(`App listening from port ${PORT}`);
})

//to run app in lambda AWS
//module.exports.handler = serverless(app);