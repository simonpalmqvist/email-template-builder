"use strict";

//Modules

var Handlebars = require("handlebars/runtime");
var HandlebarsCompiler = require("handlebars");
var defaults = require("../config/defaults.json");

//Load precompiled templates
require("./templates");

//Register partials
Handlebars.partials = Handlebars.templates;

//Helpers
Handlebars.registerHelper({
    formatText: function formatText(text) {
        var result = text.value;
        var links = text.links;

        //If array join with linebreaks
        if (Array.isArray(text.value)) {
            result = text.value.join("<br/>");
        }

        //Insert links
        if (links) {
            result = links.reduce(function (str, link) {
                return str.replace("||" + link.identifier + "||", Handlebars.templates.link(link));
            }, result);
        }

        //Return string and insert bold instead of double underlines __BOLD__
        return new Handlebars.SafeString(result.replace(/__([^_]+)__/g, "<b>$1</b>"));
    },
    inheritSettings: function inheritSettings(parent, child, columns) {
        var maxWidth = columns ? parent.width / columns : parent.width;
        maxWidth = maxWidth - parent.padding * 2 - parent.margin * 2;

        var joinedSettings = Object.assign({}, parent.settings, child.settings || {});
        var joinedValues = Object.assign({}, defaults, child);

        joinedValues.width = child.width ? Math.min(child.width, maxWidth) : maxWidth;
        joinedValues.settings = joinedSettings;
        Handlebars.Utils.extend(child, joinedValues);
    },
    outerWidth: function outerWidth(width, parent) {
        return width + parent.padding * 2 + parent.margin * 2;
    },
    centerImage: function centerImage(align) {
        var result = align === "center" ? "Margin: 0 auto;" : "";

        return new Handlebars.SafeString(result);
    }
});

function compileTemplate(source, helpers) {
    helpers = helpers || {
        helperMissing: function helperMissing() {
            var options = Array.prototype.slice.call(arguments);
            options.splice(-1, 1);
            return "{" + options.join(" ") + "}";
        }
    };

    HandlebarsCompiler.registerHelper(helpers);

    var template = HandlebarsCompiler.compile(source);

    HandlebarsCompiler.unregisterHelper(helpers);
    return template;
}

module.exports = {
    generate: function generate(data, template, helpers) {
        var result = undefined;

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