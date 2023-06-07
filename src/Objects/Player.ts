namespace Sokoban {
    
    export class Player extends MoveableObject {

        posX: number;
        posY: number;
        isMoving: boolean;
        isLookingForward: boolean;
        
        constructor(scene: Phaser.Scene, x: number, y: number) {
            super(scene, x, y, 'tiles', 3);
            this.isMoving = false;
            this.isLookingForward = true;
        }

        move(deltaX: number, deltaY: number, tileSize: number){
            // now the player is moving
            this.isMoving = true;
            // moving with a 1/10s tween
            super.move(deltaX, deltaY, tileSize, function() {
                // now the player is not moving anymore
                this.isMoving = false;
            }, this);
            // updating player custom posX and posY attributes
            this.posX+=deltaX;
            this.posY+=deltaY;
        }    
    }
}