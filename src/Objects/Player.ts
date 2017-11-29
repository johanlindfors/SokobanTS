module Sokoban {
    
    export class Player extends Phaser.Sprite {

        posX: number;
        posY: number;
        isMoving: boolean;
        
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'tiles', 4);
            this.isMoving = false;
            this.game.add.existing(this);
        }

        move(deltaX: number, deltaY: number, tileSize: number){
            // now the player is moving
            this.isMoving = true;
            // moving with a 1/10s tween
            var playerTween = this.game.add.tween(this);
            playerTween.to({
                x: this.x + deltaX * tileSize,
                y: this.y + deltaY * tileSize
            }, 100, Phaser.Easing.Linear.None,true);
            // setting a tween callback 
            playerTween.onComplete.add(function(){
                // now the player is not moving anymore
                this.isMoving = false;
            }, this);
            // updating player custom posX and posY attributes
            this.posX+=deltaX;
            this.posY+=deltaY;
        }    
    }
}