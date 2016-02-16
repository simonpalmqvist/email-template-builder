#! /usr/bin/env node
"use strict";

var emailTemplateBuilder = require("../app");
var fs = require("fs");
var argv = require("optimist").argv;
var path = require("path");

var write = function write(dir, name, ext, data) {
    dir = path.join(dir, name + "." + ext);

    fs.writeFile(dir, data, function (error) {
        if (error) {
            throw error;
        }

        console.log("updated file " + dir);
    });
};

var templateConfigPath = argv._[0];

if (!templateConfigPath) {
    console.log("You need to provide an template config file.");
}

var fileName = path.basename(templateConfigPath).split(".")[0];
var outputDir = argv.f || "./";
var data = argv.hbsData ? JSON.parse(fs.readFileSync(argv.hbsData, "utf8")) : null;

var generate = function generate() {
    try {
        var templateConfig = JSON.parse(fs.readFileSync(templateConfigPath, "utf8"));

        var template = emailTemplateBuilder.generate(templateConfig);
        write(outputDir, fileName, "handlebars", template);

        if (data) {
            var html = emailTemplateBuilder.generate(data, template);
            write(outputDir, fileName, "html", html);
        }
    } catch (error) {
        console.log(error);
    }
};

fs.watchFile(templateConfigPath, generate);

generate();