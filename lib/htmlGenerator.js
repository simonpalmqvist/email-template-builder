"use strict";

//Modules
const Handlebars = require("handlebars");

//Templates
const mainTemplate = require("./templates/main.hbs");
const linkTemplate = require("./templates/link.hbs");

//Partials
Handlebars.registerPartial({
    oneColumn:  require("./templates/oneColumn.hbs"),
    twoColumn:  require("./templates/twoColumn.hbs"),
    threeColumn:  require("./templates/threeColumn.hbs"),
    column:     require("./templates/column.hbs"),
    image:      require("./templates/image.hbs"),
    button:     require("./templates/button.hbs"),
    text:       require("./templates/text.hbs"),
    children:   require("./templates/children.hbs")
});

//Helpers
Handlebars.registerHelper({
    formatText(text) {
        let result = text.value;
        let links = text.links;

        if (Array.isArray(text.value)) {
            result = text.value.join("<br/>");
        }

        if (links) {
            result = links.reduce((str, link) => str.replace(`||${link.identifier}||`, linkTemplate(link)), result);
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
    },

    math(lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    }
});

module.exports = {
    generateTemplate(data) {
        return mainTemplate(data);
    }
};