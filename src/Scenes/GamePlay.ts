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
        undoArray: Array<number[][]>;
        crates: Crate[][];
        // Variables used to create groups. The fist group is called fixedGroup, it will contain
        // all non-moveable elements (everything but crates and player).
        // Then we add movingGroup which will contain moveable elements (crates and player)
        fixedGroup: Phaser.GameObjects.Group;
        movingGroup: Phaser.GameObjects.Group;
        cursors: Phaser.Types.Input.Keyboard.CursorKeys;

        // init(level: number[][]){
        //     this.level = level;
        //     this.undoArray = new Array<number[][]>();
        // }
                
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
            this.undoArray = new Array<number[][]>();
            this.crates = [];
            this.player = new Player(this,0,0);
            // this.goFullScreen();
            this.drawLevel();
        }

        render(){
            // this.game.debug.text(this.game.time.fps.toString(), 10,20);
        }
        
        goFullScreen(){
            // this.game.scale.pageAlignHorizontally = true;
            // this.game.scale.pageAlignVertically = true;
            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
                // push current situation in the undo array
                this.undoArray.push(Helpers.copyArray(this.level));
                this.movePlayer(deltaX, deltaY);
            }
            // if the destination tile is a crate... 
            else if(this.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)){
                // ...if  after the create there's a walkable tils...
                if(this.isWalkable(this.player.posX + 2 * deltaX, this.player.posY + 2 * deltaY)) {
                    // push current situation in the undo array
                    this.undoArray.push(Helpers.copyArray(this.level));
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
                    // // undo
                    // case 46:
                    //     // if there's something to undo...
                    //     if(this.undoArray.length > 0){
                    //         // then undo! and remove the latest move from undoArray
                    //         var undoLevel = this.undoArray.pop();
                    //         this.fixedGroup.destroy();
                    //         this.movingGroup.destroy();
                    //         this.level = [];
                    //         this.level = Helpers.copyArray(undoLevel);
                    //         this.drawLevel();
                    //     }
                    //     break;
                // }
            }
        }

        drawLevel() {
            // empty crates array. Don't use crates = [] or it could mess with pointers
            this.crates.length = 0;
            // adding the two groups to the game
            this.fixedGroup = this.add.group();
            this.movingGroup = this.add.group();
            // variable used for tile creation
            var tile;
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
                            this.movingGroup.add(this.player);
                            // since the player is on the floor, I am also creating the floor tile
                            tile = this.add.sprite(TILESIZE * j, TILESIZE * i, "tiles");
                            tile.frame = this.textures.getFrame(
                                'tiles', 
                                this.level[i][j] - PLAYER
                            );
                            // floor does not move so I am adding it to fixedGroup
                            this.fixedGroup.add(tile);
                            break;

                        case CRATE:
                        case CRATE+SPOT:
                            // crate creation, both as a sprite and as a crates array item
                            this.crates[i][j] = new Crate(this, TILESIZE * j, TILESIZE * i);
                            // assigning the crate the proper frame
                            this.crates[i][j].frame = this.textures.getFrame(
                                'tiles',
                                this.level[i][j]
                            );
                            // adding the crate to movingGroup
                            this.movingGroup.add(this.crates[i][j]);
                            // since the create is on the floor, I am also creating the floor tile
                            tile = this.add.sprite(TILESIZE * j, TILESIZE * i,"tiles");
                            tile.frame = this.textures.getFrame(
                                'tiles',
                                this.level[i][j] - CRATE
                            );
                            // floor does not move so I am adding it to fixedGroup
                            this.fixedGroup.add(tile);
                            break;

                        default:
                            // creation of a simple tile
                            tile = this.add.sprite(TILESIZE * j, TILESIZE * i,"tiles");
                            tile.frame = this.textures.getFrame(
                                'tiles',
                                this.level[i][j]
                            );
                            this.fixedGroup.add(tile);
                    }
                }
            }
        }
    }
}
