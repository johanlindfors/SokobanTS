/// <reference path="MoveableObject.ts" />

namespace Sokoban {
    
    export class Player extends MoveableObject {

        posX: number;
        posY: number;
        isMoving: boolean;
        isLookingForward: boolean;
        
        constructor(scene: Phaser.Scene) {
            super(scene, 0, 0, 'tiles', 3);
            this.isMoving = false;
            this.isLookingForward = true;
        }

        move(deltaX: number, deltaY: number){
            this.isMoving = true;
            super.move(deltaX, deltaY, function() {
                this.isMoving = false;
            }, this);

            this.posX += deltaX;
            this.posY += deltaY;
        }

        initialize(index: number, width: number) {
            this.posX = index % width;
            this.posY = (index - this.posX) / width;

            this.x = this.posX * TILESIZE;
            this.y = this.posY * TILESIZE;
        }

    }
}
