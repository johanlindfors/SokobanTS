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
        isWalkable(posX: number, posY: number) {
            return this.level[posY][posX] == EMPTY || this.level[posY][posX] == SPOT;
        }

        // a tile is a crate when it's a... guess what? crate, or it's a crate on its spot
        isCrate(posX: number, posY: number){
            return this.level[posY][posX] == CRATE || this.level[posY][posX] == CRATE+SPOT;	
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
                            // since the player is on the floor, I am also creating the floor tile
                            this.addFixedTile(j * TILESIZE, i * TILESIZE, this.level[i][j] - PLAYER);
                            break;

                        case CRATE:
                        case CRATE+SPOT:
                            // crate creation, both as a sprite and as a crates array item
                            let crate = new Crate(this.scene, TILESIZE * j, TILESIZE * i);
                            crate.frame = this.scene.textures.getFrame(
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