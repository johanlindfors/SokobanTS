/// <reference path="MoveableObject.ts" />

namespace Sokoban {

    export class Crate extends MoveableObject {
            
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'tiles', 4);
        }
    }
}