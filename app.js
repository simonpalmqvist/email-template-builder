"use strict";

const htmlGen = require("./lib/htmlGenerator");
const fs = require("fs");

if (process.argv.length > 2) {
    let config = process.argv[2];
    console.time("Total");
    console.time("Generation");
    let html = htmlGen.generateTemplate(require(`./input/${config}.json`));
    console.timeEnd("Generation");
    fs.writeFile(`./output/${config}.html`, html, (error) => {
        if (error)  {
            throw error;
        }

        console.timeEnd("Total");
        console.log("updated file");
    });
}
