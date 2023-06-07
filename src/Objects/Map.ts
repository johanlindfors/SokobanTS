/// <reference path="../Constants.ts" />

namespace Sokoban {
    export class Map extends Phaser.GameObjects.Group {
        level: number[][];
        crates: Crate[][];

        constructor(scene: Phaser.Scene, level: number[][]) {
            super(scene);
            this.level = level;
            this.crates = [];
        }

        // a tile is walkable when it's an empty tile or a spot tile
        isWalkable(x: number, y: number) {
            return this.level[y][x] == EMPTY || this.level[y][x] == SPOT;
        }

        // a tile is a crate when it's a... guess what? crate, or it's a crate on its spot
        isCrate(x: number, y: number){
            return this.level[y][x] == CRATE || this.level[y][x] == CRATE+SPOT;	
        }
        
        // function to move the crate
        moveCrate(deltaX: number, deltaY: number, playerX: number, playerY: number) {
            let oldCratePosX = playerX + deltaX;
            let oldCratePosY = playerY + deltaY;

            let newCratePosX = playerX + 2 * deltaX;
            let newCratePosY = playerY + 2 * deltaY;
            
            let crate = this.crates[oldCratePosY][oldCratePosX];
            crate.move(deltaX, deltaY, TILESIZE, function() {
                if(this.checkWin()) {
                    this.scene.scene.start('win');
                }
            }, this);

            // updating crates array
            this.crates[newCratePosY][newCratePosX] = crate;
            this.crates[oldCratePosY][oldCratePosX] = null;

            // updating crate positions in level array
            this.level[oldCratePosY][oldCratePosX] -= CRATE;
            this.level[newCratePosY][newCratePosX] += CRATE;

            // changing crate frame accordingly
            crate.frame = this.scene.textures.getFrame(
                'tiles',
                this.level[newCratePosY][newCratePosX]
            );
        }

        checkWin() : boolean {
            for(let y = 0; y < this.level.length; y++) {
                for(let x = 0; x < this.level[y].length; x++) {
                    // not positioned a box on every spot
                    if(this.level[y][x] == SPOT) {
                        return false;
                    }
                }
            }
            return true;
        }

        addFixedTile(x: integer, y: integer, frameIndex: integer) {
            let tile = this.scene.add.sprite(x, y, 'tiles');
            tile.setOrigin(0,0);
            tile.frame = this.scene.textures.getFrame(
                'tiles', 
                frameIndex
            );
            this.add(tile);
        }

        drawLevel() {
            // empty crates array. Don't use crates = [] or it could mess with pointers
            this.crates.length = 0;
            // looping trough all level rows
            for(let y = 0; y < this.level.length; y++){
                // creation of 2nd dimension of crates array
                this.crates[y]= [];
                 // looping through all level columns
                for(let x = 0; x < this.level[y].length; x++){
                    // by default, there are no crates at current level position, so we set to null its
                    // array entry
                    this.crates[y][x] = null;
                    // what do we have at row j, col i?
                    switch(this.level[y][x]){

                        case PLAYER:
                        case PLAYER+SPOT:
                            // since the player is on the floor, I am also creating the floor tile
                            this.addFixedTile(x * TILESIZE, y * TILESIZE, this.level[y][x] - PLAYER);
                            break;

                        case CRATE:
                        case CRATE+SPOT:
                            // crate creation, both as a sprite and as a crates array item
                            let crate = new Crate(this.scene, TILESIZE * x, TILESIZE * y);
                            crate.frame = this.scene.textures.getFrame(
                                'tiles',
                                this.level[y][x]
                            );
                            this.crates[y][x] = crate;
                            
                            // since the create is on the floor, I am also creating the floor tile
                            this.addFixedTile(x * TILESIZE, y * TILESIZE, this.level[y][x] - CRATE);
                            break;

                        default:
                            this.addFixedTile(x * TILESIZE, y * TILESIZE, this.level[y][x]);
                            break;
                    }
                }
            }
        }
    }
}