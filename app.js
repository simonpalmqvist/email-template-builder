"use strict";

const htmlGen = require("./lib/htmlGenerator");
const fs = require("fs");

if (process.argv.length > 2) {
    let html = htmlGen.generateTemplate(require(process.argv[2]));
    fs.writeFile("./example/example.html", html, (error) => {
        if (error)  {
            throw error;
        }

        console.log("updated file");
    });
}
