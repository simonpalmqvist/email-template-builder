"use strict";

const emailTemplateBuilder = require("./lib/emailTemplateBuilder");

module.exports = emailTemplateBuilder;

if (process.argv.length > 2) {
    const fs = require("fs");
    const path = require("path");

    const write = (name, ext, data) => {
        let path = `./output/${name}.${ext}`;

        fs.writeFile(path, data, (error) => {
            if (error)  {
                throw error;
            }

            console.log("updated file " + path);
        });
    };

    let fileName = path.basename(process.argv[2]).split(".")[0];

    let generate = () => {
        try {
            let templateConfig = require(process.argv[2]);
            let data = process.argv[3] ? require(process.argv[3]) : null;
            let helpers = process.argv[4] ? require(process.argv[4]) : null;

            let template = emailTemplateBuilder.generateTemplate(templateConfig);
            write(fileName, "handlebars", template);

            if (data) {
                let compiledTemplate = emailTemplateBuilder.compileTemplate(template, helpers);
                let html = emailTemplateBuilder.generateTemplate(data, compiledTemplate);
                write(fileName, "html", html);
            }

            process.argv
                .slice(2)
                .forEach((path) => delete require.cache[require.resolve(path)]);

        } catch (error) {
            console.log(error);
        }

    };

    process.argv
        .slice(2)
        .filter((file) => file)
        .forEach((file) => fs.watchFile(file, generate));

    generate();
}
