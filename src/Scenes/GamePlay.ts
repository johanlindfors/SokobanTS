/// <reference path="../Objects/Crate.ts" />
/// <reference path="../Objects/Player.ts" />
/// <reference path="../Constants.ts" />

import Helpers = Sokoban.Helpers;

namespace Sokoban {

    export class GamePlay extends Phaser.Scene {
        map: Map;
        player: Player;
        cursors: Phaser.Types.Input.Keyboard.CursorKeys;

        constructor() {
            super({
                key: 'gamePlay'
            })
        }

        init(data: MapConfig) {
            this.map = new Map(this, data);
            this.player = new Player(this);
        }

        create() {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.map.initialize();
            this.player.initialize(this.map.playerStartIndex, this.map.width);
        }

        move(deltaX: number, deltaY: number){
            if(this.map.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)){
                if(this.map.isWalkable(this.player.posX + 2 * deltaX, this.player.posY + 2 * deltaY)) {
                    this.map.moveCrate(deltaX, deltaY, this.player.posX, this.player.posY);
                    this.movePlayer(deltaX, deltaY);
                }
            }
            else if(this.map.isWalkable(this.player.posX + deltaX,this.player.posY + deltaY)){
                this.movePlayer(deltaX, deltaY);
            }
        }

        movePlayer(deltaX: number, deltaY: number){
            this.player.move(deltaX, deltaY);
        }

        update() {
            if(this.player.isMoving) {
                return;
            }
            if(this.cursors.left.isDown) {
                this.player.isLookingForward = true;
                this.move(-1,0);
            } else if(this.cursors.up.isDown) {
                this.player.isLookingForward = false;
                this.move(0,-1);
            } else if(this.cursors.right.isDown) {
                this.player.isLookingForward = true;
                this.move(1,0);
            } else if(this.cursors.down.isDown) {
                this.player.isLookingForward = true;
                this.move(0,1);
            }
            this.player.frame = this.textures.getFrame(
                'tiles',
                this.player.isLookingForward ? PLAYER : PLAYER+SPOT
            );
        }
    }
}
