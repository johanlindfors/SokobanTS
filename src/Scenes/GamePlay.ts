/// <reference path="../Objects/Crate.ts" />
/// <reference path="../Objects/Player.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Constants.ts" />

import Helpers = Sokoban.Helpers;

namespace Sokoban {

    class LevelConfig {
        level: string
    }

    export class GamePlay extends Phaser.Scene {
        player: Player;
        fixedGroup: Phaser.GameObjects.Group;
        cursors: Phaser.Types.Input.Keyboard.CursorKeys;
        map: Map;

        constructor() {
            super({
                key: 'gamePlay'
            })
        }

        init(data: LevelConfig) {
            this.map = new Map(this, Helpers.parse(data.level));
        }

        create() {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.player = new Player(this, 0, 0);
            this.map.drawLevel();
            this.drawPlayer();
        }

        // function to move the player
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
            this.map.level[this.player.posY][this.player.posX] -= PLAYER;
            // let the player move with tweening
            this.player.move(deltaX, deltaY, TILESIZE);
            // updating player new position in level array
            this.map.level[this.player.posY][this.player.posX] += PLAYER;
            // changing player frame accordingly
            // this.player.frame = this.textures.getFrame(
            //     'tiles',
            //     this.map.level[this.player.posY][this.player.posX]
            // );
        }

        update() {
            // if the player is not moving...
            if(!this.player.isMoving){
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

        drawPlayer() {
            // looping trough all level rows
            for(let y = 0; y < this.map.level.length; y++){
                 // looping through all level columns
                for(let x = 0; x < this.map.level[y].length; x++){
                    if( this.map.level[y][x] == PLAYER ||
                        this.map.level[y][x] == PLAYER+SPOT ){
                        // player creation
                        this.player.x = TILESIZE * x;
                        this.player.y = TILESIZE * y;
                        // assigning the player the proper frame
                        // this.player.frame = this.textures.getFrame(
                        //     'tiles',
                        //     this.map.level[y][x]
                        // );
                        // creation of two custom attributes to store player x and y position
                        this.player.posX = x;
                        this.player.posY = y;
                    }
                }
            }
        }
    }
}
