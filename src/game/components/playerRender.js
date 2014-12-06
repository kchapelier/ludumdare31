var PIXI = require('pixi.js');
var texture = PIXI.Texture.fromImage('./assets/images/placeholder.png', false);
var textureHitbox = PIXI.Texture.fromImage('./assets/images/hitbox.png', false);

module.exports = {
    initialize : function(element) {
        element.sprite = new PIXI.Sprite(texture);
        element.hitbox = new PIXI.Sprite(textureHitbox);
    },
    render : function(element) {
        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
        element.hitbox.x = Math.round(element.x + 8);
        element.hitbox.y = Math.round(element.y + 8);

        if(element.focused) {
            element.hitbox.visible = true;
        } else {
            element.hitbox.visible = false;
        }
    }
};
