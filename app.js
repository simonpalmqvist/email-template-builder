"use strict";

const htmlGen = require("./lib/htmlGenerator");

const exampleData = require("./example/example.json");

let html = htmlGen.generateTemplate(exampleData);

console.log(html);