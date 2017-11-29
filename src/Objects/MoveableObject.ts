namespace Sokoban {
    
    export class MoveableObject extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number) {
            super(game, x, y, key, frame);
            this.game.add.existing(this);
        }

        move(deltaX: number, deltaY: number, tileSize: number, callback?: Function){
            // move with a 1/10s tween
            var tween = this.game.add.tween(this);
            tween.to({
                x: this.x + deltaX * tileSize,
                y: this.y + deltaY * tileSize
            }, 100, Phaser.Easing.Linear.None,true);
            // setting an eventual tween callback 
            if(callback != null) {
                tween.onComplete.add(callback, this);
            }
        }    
    }
}