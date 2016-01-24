"use strict";

//Modules
const Handlebars = require("handlebars");

//Templates
const mainTemplate = require("./templates/main.hbs");
const linkTemplate = require("./templates/link.hbs");

//Partials
Handlebars.registerPartial({
    oneColumn: require("./templates/oneColumn.hbs"),
    image: require("./templates/image.hbs"),
    text: require("./templates/text.hbs"),
    children: require("./templates/children.hbs")
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

    columnSize(width, columns) {
        return width / columns;
    },

    inheritSettings(parent, child) {
        let joinedSettings = Object.assign({}, parent.settings, child.settings || {});
        Handlebars.Utils.extend(child, {settings: joinedSettings});
    },

    centerImage(align) {
        let result = align === "center" ? "Margin: 0 auto;" : "";

        return new Handlebars.SafeString(result);
    }
});

module.exports = {
    generateTemplate(data) {
        return mainTemplate(data);
    }
};