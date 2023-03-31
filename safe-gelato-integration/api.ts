import * as express from "express";
// import {getSafeAddr} from "./safe"

var cors = require('cors')

const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

app.post('/api', cors(), async(req, res) => {
    const msg = "SERVER!"
    console.log(msg);
    res.status(200);
    res.send({"OK": 200});
    // await getSafeAddr();
});

const port = 7070;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});