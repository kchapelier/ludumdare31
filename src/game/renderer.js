"use strict";

var PIXI = require('pixi.js'),
    width = 800,
    height = 600;

var renderer = PIXI.autoDetectRenderer(width, height),
    stage = new PIXI.Stage(0xFFFFFF);

module.exports = {
    screenWidth : width,
    screenHeight : height,
    infectDom : function(domElement) {
        if(typeof domElement === 'string') {
            domElement = document.getElementById(domElement);
        }

        domElement.appendChild(renderer.view);
    },
    addElement : function(element) {
        stage.addChild(element);
    },
    removeElement : function(element) {
        stage.removeChild(element);
    },
    render : function() {
        renderer.render(stage);
    }
};
