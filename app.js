"use strict";

const htmlGen = require("./lib/htmlGenerator");
const fs = require("fs");

function write(name, ext, data) {
    let fileName = `./output/${name}.${ext}`;

    fs.writeFile(fileName, data, (error) => {
        if (error)  {
            throw error;
        }

        console.log("updated file " + fileName);
    });
}

if (process.argv.length > 2) {
    let file = process.argv[2];

    let config = require(`./input/${file}.json`);
    let template = htmlGen.generateTemplate(config);
    let ext = config.hbs ? "handlebars" : "html";

    write(file, ext, template);

    if (process.argv.length > 3) {
        let data = require(`./input/${process.argv[3]}.json`);
        let compiledTemplate = htmlGen.compileTemplate(template);
        let example = htmlGen.generateTemplate(data, compiledTemplate);
        write(file, "html", example);
    }
}
