"use strict";

var GameObject = {
    createFactory : function(baseComponents) {
        var components = arguments;

        return function(otherComponents) {
            var allComponents = [],
                i;

            for(i = 0; i < components.length; i++) {
                allComponents.push(components[i]);
            }

            for(i = 0; i < arguments.length; i++) {
                allComponents.push(arguments[i]);
            }

            console.log(allComponents);

            return GameObject.create.apply(GameObject, allComponents);
        };
    },
    create : function(components) {
        var updateFunctions = [];
        var postUpdateFunctions = [];
        var preRenderFunctions = [];
        var renderFunctions = [];
        var postRenderFunctions = [];

        var object = {
            update : function(dt) {
                for(var i = 0; i < updateFunctions.length; i++) {
                    updateFunctions[i](this, dt);
                }
            },
            postUpdate : function(dt) {
                for(var i = 0; i < postUpdateFunctions.length; i++) {
                    postUpdateFunctions[i](this, dt);
                }
            },
            preRender : function(dt) {
                for(var i = 0; i < preRenderFunctions.length; i++) {
                    preRenderFunctions[i](this, dt);
                }
            },
            render : function(dt) {
                for(var i = 0; i < renderFunctions.length; i++) {
                    renderFunctions[i](this, dt);
                }
            },
            postRender : function(dt) {
                for(var i = 0; i < postRenderFunctions.length; i++) {
                    postRenderFunctions[i](this, dt);
                }
            }
        };

        for(var i = 0; i < arguments.length; i++) {
            var component = arguments[i];

            for(var key in component) {
                if(component.hasOwnProperty(key)) {
                    if(key === 'update') {
                        updateFunctions.push(component[key]);
                    } else if(key === 'postUpdate') {
                        postUpdateFunctions.push(component[key]);
                    } else if(key === 'preRender') {
                        preRenderFunctions.push(component[key]);
                    } else if(key === 'render') {
                        renderFunctions.push(component[key]);
                    } else if(key === 'postRender') {
                        postRenderFunctions.push(component[key]);
                    } else {
                        object[key] = component[key];
                    }
                }
            }
        }

        return object;
    }
};

module.exports = GameObject;
