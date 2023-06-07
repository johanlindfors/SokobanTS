/// <reference path="../Objects/Crate.ts" />
/// <reference path="../Objects/Player.ts" />
/// <reference path="../Helpers.ts" />

import Helpers = Sokoban.Helpers;

namespace Sokoban {

    const EMPTY = 0;
    const WALL = 1;
    const SPOT = 2;
    const CRATE = 3;
    const PLAYER = 4;
    const TILESIZE = 40;

    class LevelConfig {
        level: string
    }

    export class GamePlay extends Phaser.Scene {
        level: number[][];
        player: Player;
        crates: Crate[][];
        fixedGroup: Phaser.GameObjects.Group;        
        cursors: Phaser.Types.Input.Keyboard.CursorKeys;

        constructor() {
            super({
                key: 'gamePlay'
            })
        }

        init(data: LevelConfig) {
            this.level = Helpers.parse(data.level);
        }

        create() {
            this.cursors = this.input.keyboard.createCursorKeys();
            // this.game.time.advancedTiming = true;
            this.crates = [];
            this.player = new Player(this, 0, 0);
            // this.goFullScreen();
            this.drawLevel();
        }

        // a tile is walkable when it's an empty tile or a spot tile
        isWalkable(posX: number, posY: number) {
            return this.level[posY][posX] == EMPTY || this.level[posY][posX] == SPOT;
        }

        // a tile is a crate when it's a... guess what? crate, or it's a crate on its spot
        isCrate(posX: number, posY: number){
            return this.level[posY][posX] == CRATE || this.level[posY][posX] == CRATE+SPOT;	
        }

        // function to move the player
        move(deltaX: number, deltaY: number){
            // if destination tile is walkable...
            if(this.isWalkable(this.player.posX + deltaX,this.player.posY + deltaY)){
                this.movePlayer(deltaX, deltaY);
            }
            // if the destination tile is a crate... 
            else if(this.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)){
                // ...if  after the create there's a walkable tils...
                if(this.isWalkable(this.player.posX + 2 * deltaX, this.player.posY + 2 * deltaY)) {
                    // move the crate
                    this.moveCrate(deltaX, deltaY);
                    // move the player	
                    this.movePlayer(deltaX, deltaY);
                }
            }
        }

        // function to move the player
        movePlayer(deltaX: number, deltaY: number){
            // updating player old position in level array   
            this.level[this.player.posY][this.player.posX] -= PLAYER;  
            // let the player move with tweening
            this.player.move(deltaX, deltaY, TILESIZE);
            // updating player new position in level array 
            this.level[this.player.posY][this.player.posX] += PLAYER;  
            // changing player frame accordingly
            this.player.frame = this.textures.getFrame(
                'tiles',
                this.level[this.player.posY][this.player.posX]
            );
        }
        
      	// function to move the crate
        moveCrate(deltaX: number, deltaY: number) {
            let oldCratePosX = this.player.posX + deltaX;
            let oldCratePosY = this.player.posY + deltaY;

            let newCratePosX = this.player.posX + 2 * deltaX;
            let newCratePosY = this.player.posY + 2 * deltaY;
            
            let crate = this.crates[oldCratePosY][oldCratePosX];
            crate.move(deltaX, deltaY, TILESIZE, function() {
                if(this.checkWin()) {
                    this.scene.start('win');
                }
            }, this);

            // updating crates array
            this.crates[newCratePosY][newCratePosX] = crate;
            this.crates[oldCratePosY][oldCratePosX] = null;

            // updating crate positions in level array
            this.level[oldCratePosY][oldCratePosX] -= CRATE;
            this.level[newCratePosY][newCratePosX] += CRATE;

            // changing crate frame accordingly
            crate.frame = this.textures.getFrame(
                'tiles',
                this.level[newCratePosY][newCratePosX]
            );
        }

        checkWin() : boolean {
            for(let i = 0; i < this.level.length; i++) {
                for(let j = 0; j < this.level[i].length; j++) {
                    // not positioned a box on every spot
                    if(this.level[i][j] == SPOT) {
                        return false;
                    }
                }
            }
            return true;
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
            tile.frame = this.textures.getFrame(
                'tiles', 
                frameIndex
            );
            this.fixedGroup.add(tile);
        }

        drawLevel() {
            // empty crates array. Don't use crates = [] or it could mess with pointers
            this.crates.length = 0;
            // adding the two groups to the game
            this.fixedGroup = this.add.group();
            // looping trough all level rows
            for(let i = 0; i < this.level.length; i++){
                // creation of 2nd dimension of crates array
                this.crates[i]= [];
                 // looping through all level columns
                for(let j = 0; j < this.level[i].length; j++){
                    // by default, there are no crates at current level position, so we set to null its
                    // array entry
                    this.crates[i][j] = null;
                    // what do we have at row j, col i?
                    switch(this.level[i][j]){

                        case PLAYER:
                        case PLAYER+SPOT:
                            // player creation
                            this.player.x = TILESIZE * j;
                            this.player.y = TILESIZE * i;
                            // assigning the player the proper frame
                            this.player.frame = this.textures.getFrame(
                                'tiles',
                                this.level[i][j]
                            );
                            // creation of two custom attributes to store player x and y position
                            this.player.posX = j;
                            this.player.posY = i;
                            // adding the player to movingGroup
                            
                            // since the player is on the floor, I am also creating the floor tile
                            this.addFixedTile(j * TILESIZE, i * TILESIZE, this.level[i][j] - PLAYER);
                            break;

                        case CRATE:
                        case CRATE+SPOT:
                            // crate creation, both as a sprite and as a crates array item
                            let crate = new Crate(this, TILESIZE * j, TILESIZE * i);
                            crate.frame = this.textures.getFrame(
                                'tiles',
                                this.level[i][j]
                            );

                            this.crates[i][j] = crate;
                            
                            // since the create is on the floor, I am also creating the floor tile
                            this.addFixedTile(j * TILESIZE, i * TILESIZE, this.level[i][j] - CRATE);
                            break;

                        default:
                            this.addFixedTile(j * TILESIZE, i * TILESIZE, this.level[i][j]);
                            break;
                    }
                }
            }
        }
    }
}
