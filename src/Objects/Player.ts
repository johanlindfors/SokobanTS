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
            this.isMoving = true;
            super.move(deltaX, deltaY, tileSize, function() {
                this.isMoving = false;
            }, this);

            this.posX+=deltaX;
            this.posY+=deltaY;
        }    
    }
}
