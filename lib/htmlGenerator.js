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

        return new Handlebars.SafeString(result);
    },

    columnWidth(columns, options) {
        return options.data.root.settings.width / columns;
    },

    inheritSettings(parent, child) {
        let joinedSettings = Object.assign({}, parent.settings, child.settings || {});
        Handlebars.Utils.extend(child, {settings: joinedSettings});
    },

    centerImage(align) {
        let result = align === "center" ? "Margin: 0 auto;" : "";

        return new Handlebars.SafeString(result);
    },

    getWidth(parent, child) {
        let totalPadding = (parent.settings.padding + child.settings.padding) * 2;
        return Math.min(parent.settings.width - totalPadding, child.settings.width);
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

    compileTemplate(source) {
        HandlebarsCompiler.registerHelper("helperMissing", () => {
            let options = Array.prototype.slice.call(arguments);
            options.splice(-1, 1);

            return options.join(" ");
        });

        return HandlebarsCompiler.compile(source);
    }
};