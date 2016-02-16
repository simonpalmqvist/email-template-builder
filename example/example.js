var emailTemplateBuilder = require("../app");

var templateConfig = {
    title: "My e-mail template",
    width: 600,
    children: [
        {
            type: "container",
            settings: [{backgroundColor: "black", color: "white"}],
            children: [
                {
                    type: "text",
                    value: "Hi {{upperCase firstName}} {{lastName}}"
                }
            ]
        }
    ]
};

var data = {
    firstName: "John",
    lastName: "Doe"
};

var helpers = {
    upperCase: function(name) {
        return name.toUpperCase();
    }
};

//Generate the email template
var template = emailTemplateBuilder.generate(templateConfig);

//Generate e-mail with data
console.log(emailTemplateBuilder.generate(data, template, helpers));