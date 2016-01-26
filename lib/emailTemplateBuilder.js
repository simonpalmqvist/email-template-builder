"use strict";

//Modules
const Handlebars = require("handlebars/runtime");
const HandlebarsCompiler = require("handlebars");
const defaults = require("./defaults.json");

//Load precompiled templates
require("./templates");

//Register partials
Handlebars.partials = Handlebars.templates;

//Helpers
Handlebars.registerHelper({
    formatText(text) {
        let result = text.value;
        let links = text.links;

        if (Array.isArray(text.value)) {
            result = text.value.join("<br/>");
        }

        if (links) {
            result = links.reduce((str, link) => str.replace(`||${link.identifier}||`, Handlebars.templates.link(link)), result);
        }

        return new Handlebars.SafeString(result.replace(/__([^_]+)__/g, "<b>$1</b>"));
    },

    columnWidth(columns, maxWidth) {
        return maxWidth / columns;
    },

    inheritSettings(parent, child) {
        let joinedSettings = Object.assign({}, parent.settings, child.settings || {});
        Handlebars.Utils.extend(child, {settings: joinedSettings});
    },

    centerImage(align) {
        let result = align === "center" ? "Margin: 0 auto;" : "";

        return new Handlebars.SafeString(result);
    },

    getMaxWidth(parent) {
        return parent.settings.width - (parent.settings.padding * 2);
    },

    getWidth(width, maxWidth) {
        return Math.min(maxWidth, width);
    }
});

module.exports = {
    generateTemplate(data, template) {
        let result;

        console.time("Generation");

        if (!template) {
            data.settings = Object.assign({}, defaults, data.settings || {});
            template = Handlebars.templates.main;
        }

        result = template(data);
        console.timeEnd("Generation");

        return result;
    },

    compileTemplate(source, helpers) {
        helpers = helpers || {
                helperMissing() {
                    let options = Array.prototype.slice.call(arguments);
                    options.splice(-1, 1);
                    return "{" + options.join(" ") + "}";
                }
            };

        HandlebarsCompiler.registerHelper(helpers);

        console.time("Compile");
        let template = HandlebarsCompiler.compile(source);
        console.timeEnd("Compile");

        HandlebarsCompiler.unregisterHelper(helpers);
        return template;
    }
};