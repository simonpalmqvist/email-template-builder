# Email Template Builder

More information to come...

##How to build an e-mail in json-format

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
* __children__ (array) Needs to contain of 2 or 3 (depending on type) column objects

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
    "children": [
        {"type": "column"},
        {"type": "column"}
    ]
}
```

####Column
__Important:__ Needs to be a child of a column container.

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

####Link

####Image

####Spacing

####Separator

####Table

####Row

####Cell

####Pre header

###Handlebars objects


##Build and test scripts

###Build a template
FILE=./example/example.json npm run build:template

###Watch a template
