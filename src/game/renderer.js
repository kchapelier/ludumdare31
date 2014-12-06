"use strict";

var PIXI = require('pixi.js');

var renderer = PIXI.autoDetectRenderer(600, 400);
var stage = new PIXI.Stage(0xFFFFFF);

module.exports = {
    infectDom : function(domElement) {
        if(typeof domElement === 'string') {
            domElement = document.getElementById(domElement);
        }

        domElement.appendChild(renderer.view);
    },
    addElement : function(element) {
        stage.addChild(element);
    },
    render : function() {
        renderer.render(stage);
    }
};
