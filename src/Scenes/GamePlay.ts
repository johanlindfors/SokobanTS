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
            // if destination tile is walkable...
            if(this.map.isWalkable(this.player.posX + deltaX,this.player.posY + deltaY)){
                this.movePlayer(deltaX, deltaY);
            }
            // if the destination tile is a crate... 
            else if(this.map.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)){
                // ...if  after the create there's a walkable tils...
                if(this.map.isWalkable(this.player.posX + 2 * deltaX, this.player.posY + 2 * deltaY)) {
                    // move the crate
                    this.map.moveCrate(deltaX, deltaY, this.player.posX, this.player.posY);
                    // move the player	
                    this.movePlayer(deltaX, deltaY);
                }
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
            this.player.frame = this.textures.getFrame(
                'tiles',
                this.map.level[this.player.posY][this.player.posX]
            );
        }
        
        update() {
            // if the player is not moving...
            if(!this.player.isMoving){
                if(this.cursors.left.isDown){
                    this.move(-1,0);
                } else if(this.cursors.up.isDown) {
                    this.move(0,-1);
                } else if(this.cursors.right.isDown) {
                    this.move(1,0);
                } else if(this.cursors.down.isDown) {
                    this.move(0,1);
                }
            }
        }

        addFixedTile(x: integer, y: integer, frameIndex: integer) {
            let tile = this.add.sprite(x, y, 'tiles');
            tile.setOrigin(0,0);
            tile.frame = this.textures.getFrame(
                'tiles', 
                frameIndex
            );
            this.fixedGroup.add(tile);
        }

        drawPlayer() {
            // looping trough all level rows
            for(let i = 0; i < this.map.level.length; i++){
                 // looping through all level columns
                for(let j = 0; j < this.map.level[i].length; j++){
                    if( this.map.level[i][j] == PLAYER || 
                        this.map.level[i][j] == PLAYER+SPOT ){
                        // player creation
                        this.player.x = TILESIZE * j;
                        this.player.y = TILESIZE * i;
                        // assigning the player the proper frame
                        this.player.frame = this.textures.getFrame(
                            'tiles',
                            this.map.level[i][j]
                        );
                        // creation of two custom attributes to store player x and y position
                        this.player.posX = j;
                        this.player.posY = i;
                    }
                }
            }
        }
    }
}
