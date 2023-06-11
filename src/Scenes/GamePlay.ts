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
        }

        create() {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.player = new Player(this, 0, 0);
            this.map.drawLevel();
            this.drawPlayer();
        }

        move(deltaX: number, deltaY: number){
            // if the destination tile is a crate...
            if(this.map.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)){
                // ...if  after the create there's a walkable tils...
                if(this.map.isWalkable(this.player.posX + 2 * deltaX, this.player.posY + 2 * deltaY)) {
                    // move the crate
                    this.map.moveCrate(deltaX, deltaY, this.player.posX, this.player.posY);
                    // move the player
                    this.movePlayer(deltaX, deltaY);
                }
            }
            // or if destination tile is walkable...
            else if(this.map.isWalkable(this.player.posX + deltaX,this.player.posY + deltaY)){
                this.movePlayer(deltaX, deltaY);
            }
        }

        // function to move the player
        movePlayer(deltaX: number, deltaY: number){
            // updating player old position in level array
            this.map.level[this.player.posY * this.map.width + this.player.posX] -= PLAYER;
            // let the player move with tweening
            this.player.move(deltaX, deltaY, TILESIZE);
            // updating player new position in level array
            this.map.level[this.player.posY * this.map.width + this.player.posX] += PLAYER;
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

        drawPlayer() {
            // looping trough all level rows
            for(let index = 0; index < this.map.level.length; index++) {
                if( this.map.level[index] == PLAYER ||
                    this.map.level[index] == PLAYER+SPOT ){
                    // creation of two custom attributes to store player x and y position
                    this.player.posX = index % this.map.width;
                    this.player.posY = (index - this.player.posX) / this.map.width;
                    // player creation
                    this.player.x = this.player.posX * TILESIZE;
                    this.player.y = this.player.posY * TILESIZE;
                    return;
                }
            }
        }
    }
}
