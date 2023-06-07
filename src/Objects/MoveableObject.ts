namespace Sokoban {
    
    export class MoveableObject extends Phaser.GameObjects.Sprite {
        
        constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame: number) {
            super(scene, x, y, key, frame);
            this.setOrigin(0,0);
            this.depth = 1;
            this.scene.add.existing(this);
        }

        move(deltaX: number, deltaY: number, tileSize: number, callback?: Function, listenerContext?: any){
            // move with a 1/10s tween
            const tween = this.scene.tweens.add({
                targets: this,
                duration: 100,
                x: this.x + deltaX * tileSize,
                y: this.y + deltaY * tileSize,
            });
            tween.setCallback("onComplete", callback);
            tween.callbackScope = listenerContext;
        }    
    }
}