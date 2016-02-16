"use strict";

//Modules
const Handlebars = require("handlebars/runtime");
const HandlebarsCompiler = require("handlebars");
const defaults = require("../config/defaults.json");

//Load precompiled templates
require("./templates");

//Register partials
Handlebars.partials = Handlebars.templates;

//Helpers
Handlebars.registerHelper({
    formatText(text) {
        let result = text.value;
        let links = text.links;

        //If array join with linebreaks
        if (Array.isArray(text.value)) {
            result = text.value.join("<br/>");
        }

        //Insert links
        if (links) {
            result = links.reduce((str, link) => str.replace(`||${link.identifier}||`, Handlebars.templates.link(link)), result);
        }

        //Return string and insert bold instead of double underlines __BOLD__
        return new Handlebars.SafeString(result.replace(/__([^_]+)__/g, "<b>$1</b>"));
    },

    inheritSettings(parent, child, columns) {
        let maxWidth = columns ? (parent.width / columns) : parent.width;
        maxWidth = maxWidth - (parent.padding * 2) - (parent.margin * 2);

        let joinedSettings = Object.assign({}, parent.settings, child.settings || {});
        let joinedValues = Object.assign({}, defaults, child);

        joinedValues.width = child.width ? Math.min(child.width, maxWidth) : maxWidth;
        joinedValues.settings = joinedSettings;
        Handlebars.Utils.extend(child, joinedValues);
    },

    outerWidth(width, parent) {
        return width + (parent.padding * 2) + (parent.margin * 2);
    },

    centerImage(align) {
        let result = align === "center" ? "Margin: 0 auto;" : "";

        return new Handlebars.SafeString(result);
    }
});

function compileTemplate(source, helpers) {
    helpers = helpers || {
            helperMissing() {
                let options = Array.prototype.slice.call(arguments);
                options.splice(-1, 1);
                return "{" + options.join(" ") + "}";
            }
        };

    HandlebarsCompiler.registerHelper(helpers);

    let template = HandlebarsCompiler.compile(source);

    HandlebarsCompiler.unregisterHelper(helpers);
    return template;
}

module.exports = {
    generate(data, template, helpers) {
        let result;

        console.time("Generation");

        if (template) {
            template = compileTemplate(template, helpers);
        } else {
            data = Object.assign({}, defaults, data);
            data.settings = Object.assign({}, defaults.settings, data.settings);
            template = Handlebars.templates.main;
        }

        result = template(data);
        console.timeEnd("Generation");

        return result;
    }
};