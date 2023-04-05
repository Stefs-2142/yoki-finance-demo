import * as express from "express";
import {createStrategy} from "./src/safe"

var cors = require('cors')

const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

app.post('/api', cors(), async(req, res) => {
    const msg = "SERVER!"
    console.log(msg);

    await createStrategy() 
    res.status(200);
    res.send({"OK": 200});    
});

const port = 7070;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});