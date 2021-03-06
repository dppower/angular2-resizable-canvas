"use strict";

import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";

var app = express();

app.use("/app", express.static(path.join(__dirname, "..", "..", "build", "app")));
app.use("/css", express.static(path.join(__dirname, "..", "..", "docs", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "..", "docs", "js")));
app.use("/scripts", express.static(path.join(__dirname, "..", "..", "node_modules")));

app.set("port", process.env.PORT || 3000);

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "docs", "html", "index.html"));
});

var server = http.createServer(app);

server.listen(app.get("port"), function () {
    console.log(`Example app is listening on port ${app.get("port")}.`);
    console.log(`Script base url: ${__dirname}.`);
});