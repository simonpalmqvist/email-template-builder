"use strict";

var emailTemplateBuilder = require("./lib/emailTemplateBuilder");

module.exports = emailTemplateBuilder;

if (process.argv.length > 2) {
    (function () {
        var fs = require("fs");
        var path = require("path");

        var write = function write(name, ext, data) {
            var path = "./output/" + name + "." + ext;

            fs.writeFile(path, data, function (error) {
                if (error) {
                    throw error;
                }

                console.log("updated file " + path);
            });
        };

        var fileName = path.basename(process.argv[2]).split(".")[0];

        var generate = function generate() {
            try {
                var templateConfig = require(process.argv[2]);
                var data = process.argv[3] ? require(process.argv[3]) : null;
                var helpers = process.argv[4] ? require(process.argv[4]) : null;

                var template = emailTemplateBuilder.generateTemplate(templateConfig);
                write(fileName, "handlebars", template);

                if (data) {
                    var compiledTemplate = emailTemplateBuilder.compileTemplate(template, helpers);
                    var html = emailTemplateBuilder.generateTemplate(data, compiledTemplate);
                    write(fileName, "html", html);
                }

                process.argv.slice(2).forEach(function (path) {
                    return delete require.cache[require.resolve(path)];
                });
            } catch (error) {
                console.log(error);
            }
        };

        process.argv.slice(2).filter(function (file) {
            return file;
        }).forEach(function (file) {
            return fs.watchFile(file, generate);
        });

        generate();
    })();
}