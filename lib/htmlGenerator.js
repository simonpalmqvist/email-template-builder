"use strict";

//Modules
const Handlebars = require("handlebars");

//Templates & Partials
const mainTemplate = require("./templates/main.hbs");
Handlebars.registerPartial("container", require("./templates/container.hbs"));
Handlebars.registerPartial("text", require("./templates/text.hbs"));

module.exports = {
    test() {
        console.log(mainTemplate({children: [{type: "container", children:[{type:"text", value: "Hejsan hejsan"}]}]}));
    }
};