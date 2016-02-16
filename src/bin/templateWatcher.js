#! /usr/bin/env node

const emailTemplateBuilder = require("../app");
const fs = require("fs");
const argv = require("optimist").argv;
const path = require("path");

const write = (dir, name, ext, data) => {
    dir = path.join(dir, `${name}.${ext}`);

    fs.writeFile(dir, data, (error) => {
        if (error)  {
            throw error;
        }

        console.log("updated file " + dir);
    });
};

let templateConfigPath = argv._[0];

if (!templateConfigPath) {
    console.log("You need to provide an template config file.");
}

let fileName = path.basename(templateConfigPath).split(".")[0];
let outputDir = argv.f || "./";
let data = argv.hbsData ? JSON.parse(fs.readFileSync(argv.hbsData, "utf8")) : null;

let generate = () => {
    try {
        let templateConfig = JSON.parse(fs.readFileSync(templateConfigPath, "utf8"));

        let template = emailTemplateBuilder.generateTemplate(templateConfig);
        write(outputDir, fileName, "handlebars", template);

        if (data) {
            let compiledTemplate = emailTemplateBuilder.compileTemplate(template);
            let html = emailTemplateBuilder.generateTemplate(data, compiledTemplate);
            write(outputDir, fileName, "html", html);
        }

    } catch (error) {
        console.log(error);
    }

};

fs.watchFile(templateConfigPath, generate);

generate();
