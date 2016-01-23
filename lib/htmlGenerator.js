"use strict";

//Modules
const Handlebars = require("handlebars");

//Templates
const mainTemplate = require("./templates/main.hbs");
const containerTemplate = require("./templates/container.hbs");
const textTemplate = require("./templates/text.hbs");
const linkTemplate = require("./templates/link.hbs");

//Partials
Handlebars.registerPartial("container", containerTemplate);
Handlebars.registerPartial("text", textTemplate);

//Helpers
Handlebars.registerHelper("formatText", (text) => {
    let insertLink = (string, link) => {
        return string.replace(`||${link.identifier}||`, linkTemplate(link));
    };

    let formattedText = text.links.reduce(insertLink, text.value);

    return new Handlebars.SafeString(formattedText);
});

Handlebars.registerHelper("columnSize", (width, columns) => {
    return width / columns;
});

module.exports = {
    generateTemplate(data) {
        return mainTemplate(data);
    }
};