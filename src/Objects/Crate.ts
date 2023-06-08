/// <reference path="MoveableObject.ts" />

namespace Sokoban {

    export class Crate extends MoveableObject {
            
        constructor(scene: Phaser.Scene, x: number, y: number) {
            super(scene, x, y, 'tiles', 4);
        }
    }
}
