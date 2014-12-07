"use strict";

// TODO for future versions : fullscreen support

var PIXI = require('pixi.js'),
    baseWidth = 800, //window.innerWidth,
    baseHeight = 600; //window.innerHeight;

var renderer = PIXI.autoDetectRenderer(baseWidth, baseHeight),
    stage = new PIXI.Stage(0xFFFFFF);

module.exports = {
    screenWidth : baseWidth,
    screenHeight : baseHeight,
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
    /*,
    setFullScreen : function() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        renderer.resize(this.screenWidth, window.innerHeight);
    },
    setNormalScreen : function() {
        this.screenWidth = baseWidth;
        this.screenHeight = baseHeight;
        renderer.resize(this.screenWidth, window.innerHeight);
    }*/
};
