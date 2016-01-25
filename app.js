"use strict";

const emailTemplateBuilder = require("./lib/emailTemplateBuilder");

module.exports = emailTemplateBuilder;

if (process.argv.length > 2) {
    const fs = require("fs");

    const write = (name, ext, data) => {
        let fileName = `./output/${name}.${ext}`;

        fs.writeFile(fileName, data, (error) => {
            if (error)  {
                throw error;
            }

            console.log("updated file " + fileName);
        });
    };

    let file = process.argv[2];
    let data = process.argv[3];
    let helpers = process.argv[4];

    let config = require(`./input/${file}.json`);
    let template = emailTemplateBuilder.generateTemplate(config);

    let ext = config.hbs ? "handlebars" : "html";

    write(file, ext, template);

    if (data) {
        data = require(`./input/${data}.json`);
        helpers = helpers ? require(`./input/${helpers}.js`) : null;
        let compiledTemplate = emailTemplateBuilder.compileTemplate(template, helpers);
        let example = emailTemplateBuilder.generateTemplate(data, compiledTemplate);
        write(file, "html", example);
    }
}
