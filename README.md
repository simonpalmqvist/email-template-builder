# Email Template Builder

More information to come...

##Usage


##How to build an e-mail template

###Settings

###Main document
The start of the document doesn't require any type and must always be in the root.
######Mandatory properties
* __width__ (int)
* __title__ (string)

######Optional properties
* __children__ (array) Main document can only have containers as children
* __settings__ (object) default: see settings above
    
######Example
```json
{
    "width": 600,
    "title": "My email template",
    "settings": {
        "backgroundColor": "#4d3e39",
        "color": "#333333"
    },
    "children": []
}
```
    
###Other objects/components
Objects are differentiated by the type value which is always mandatory

####Container 
######Mandatory properties
* __type__ ("container")

######Optional properties
* __children__ (array)
* __padding__ (int) default: 0
* __border__ (string) default: "0"
* __borderRadius__ (int) default: 0
* __settings__ (object) default: see default settings
    
######Example
```json
{
    "type": "container",
    "padding": 20,
    "settings": {
        "align": "center"
    },
    "children": []
}
```

####Column containers
######Mandatory properties
* __type__ ("twoColumnContainer"/"threeColumnContainer")
* __leftColumn__ (object) Needs to be a column object
* __middleColumn__ (object) Needs to be a column object, only mandatory for threeColumnContainers
* __rightColumn__ (object) Needs to be a column object

######Optional properties
* __padding__ (int) default: 0, the padding inside each column
* __margin__ (int) default: 0, the margin around each column
* __border__ (string) default: "0"
* __borderRadius__ (int) default: 0
* __settings__ (object) default: see default settings
    
######Example
```json
{
    "type": "twoColumnContainer",
    "margin": 20,
    "padding": 20,
    "leftColumn":  {"type": "column"},
    "rightColumn": {"type": "column"}
}
```

####Column
__Important:__ Only used together with Column containers

######Mandatory properties
* __type__ ("column")

######Optional properties
* __border__ (string) default: "0"
* __borderRadius__ (int) default: 0
* __settings__ (object) default: see default settings
* __children__ (array)
    
######Example
```json
{
    "type": "column",
    "children": [
        {"type": "text", "value": "foo"}
    ]
}
```

####Text

######Mandatory properties
* __type__ ("text")
* __value__ (string) Text to be shown.

######Optional properties
* __settings__ (object) default: see default settings
* __links__ (array) array of links, needs identifier in value string that matches identifier in links, example shown below
    
######Example
```json
{
    "type": "text",
    "value": "This is a text string with a ||git-link||.",
    "links": [
        {
          "identifier": "git-link",
          "href": "https://www.github.com",
          "value": "Git link",
          "settings": {"color": "#db7447"}
        }
    ]
}
```

####Link
######Mandatory properties
* __type__ ("link")
* __value__ (string) Text to be shown.
* __href__ (string) url that the link should point to.

######Optional properties
* __settings__ (object) default: see default settings
    
######Example
```json
{
    "type": "link",
    "href": "https://www.github.com",
    "value": "Git link",
    "settings": {"color": "#db7447"}
}
```

####Image
######Mandatory properties
* __type__ ("image")
* __src__ (string) url pointing to image used.
* __alt__ (string) Alternative text to be used if image is not found or blocked by e-mail client

######Optional properties
* __width__ (int) width in pixels, if not present the width is set to 100%.
* __settings__ (object) default: see default settings
    
######Example
```json
{
    "type": "image",
    "src": "https://example.com/image.png",
    "alt": "One image",
    "width": 136,
    "settings": {"align":"center"}
}
```

####Spacing
######Mandatory properties
* __type__ ("spacing")
* __spacing__ (int) pixels that vertical space should be.
    
######Example
```json
{"type": "spacing", "spacing": 20}
```

####Separator
######Mandatory properties
* __type__ ("separator")
* __size__ (int) size of separator line in pixels
* __style__ (string) style of line/border can be none/dotted/dashed/solid
* __color__ (string) line color
    
######Example
```json
{
    "type": "separator",
    "size": 1,
    "style": "solid",
    "color": "#918e89"
},
```

####Table
######Mandatory properties
* __type__ ("table")

######Optional properties
* __width__ (int) width in pixels, if not present the width is set to 100%.
* __children__ (array) a table can only have children of type "row"
* __settings__ (object) default: see default settings
    
######Example
```json
{
    "type": "table",
    "settings": {"align": "left", "lineHeight": 20},
    "children": [
        {
            "type": "row",
            "children": [
                {
                    "type": "cell",
                    "value": "Post"
                },
                {
                    "type": "cell",
                    "settings": {"align": "right"},
                    "value": "Sum"
                }
            ]
        }
    ]
}
```

####Row
######Mandatory properties
* __type__ ("row")

######Optional properties
* __children__ (array) a row can only have children of type "cell"
* __settings__ (object) default: see default settings
    
######Example
See example for table

####Cell
######Mandatory properties
* __type__ ("cell")

######Optional properties
* __value__ (string/array) a string or an array showing text, if value is not present children can be added instead
* __children__ (array) only used if value doesn't exist
* __colSpan__ (int) number of columns the cell should span over, default 1.
* __settings__ (object) default: see default settings
    
######Example
See example for table

####Pre header
Pre header is a text that's not visible in the e-mail itself since it's hidden with styling but visible next to the subject in some e-mail clients.

######Mandatory properties
* __type__ ("preHeader")
* __value__ (string)
    
######Example
```json
{
    "type": "preHeader",
    "value": "This part will be visible next to the subject in some e-mail clients"
}
```

####Handlebars repeater (each)
If a handlebars e-mail template is generated rather than a static e-mail template then this component can be used to repeat certain components (creates an each hbs helper)

######Mandatory properties
* __type__ ("hbsEach")
* __identifier__ (string) name of the key to repeat over
* __children__ (string) childrens that should be repeated for each value in array
    
######Example
```json
hbsContext.json
{
    names: [
        "John",
        "Paul"
    ]
}

emailTemplate.json
{
    "type": "hbsEach",
    "identifier": "names",
    "children": [
        {
            "type": "text",
            "value": "{{this}}"
        }
    ]
}
```

##License
This project is under the MIT-license