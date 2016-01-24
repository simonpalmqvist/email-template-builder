"use strict";

//Modules
const Handlebars = require("handlebars");

//Templates
const mainTemplate = require("./templates/main.hbs");
const linkTemplate = require("./templates/link.hbs");

//Partials
Handlebars.registerPartial({
    oneColumn:      require("./templates/oneColumn.hbs"),
    twoColumn:      require("./templates/twoColumn.hbs"),
    twoColumnCell:  require("./templates/twoColumnCell.hbs"),
    image:          require("./templates/image.hbs"),
    button:         require("./templates/button.hbs"),
    text:           require("./templates/text.hbs"),
    children:       require("./templates/children.hbs")
});

//Helpers
Handlebars.registerHelper({
    formatText(text) {
        if (!text.links) {
            return text.value;
        }

        let insertLink = (string, link) => {
            return string.replace(`||${link.identifier}||`, linkTemplate(link));
        };

        let formattedText = text.links.reduce(insertLink, text.value);

        return new Handlebars.SafeString(formattedText);
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