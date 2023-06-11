/// <reference path="../Constants.ts" />

namespace Sokoban {
    export class Map extends Phaser.GameObjects.Group {
        level: number[];
        crates: Crate[];
        width: number;
        height: number;

        constructor(scene: Phaser.Scene, level: number[], width: number, height: number) {
            super(scene);
            this.level = level;
            this.crates = [];
            this.width = width;
            this.height = height;
        }

        // a tile is walkable when it's an empty tile or a spot tile
        isWalkable(x: number, y: number) {
            let index = y * this.width + x;
            return this.level[index] == EMPTY || this.level[index] == SPOT;
        }

        // a tile is a crate when it's a... guess what? crate, or it's a crate on its spot
        isCrate(x: number, y: number){
            let index = y * this.width + x;
            return this.level[index] == CRATE || this.level[index] == CRATE+SPOT;
        }

        // function to move the crate
        moveCrate(deltaX: number, deltaY: number, playerX: number, playerY: number) {
            let oldCrateIndex = (playerY + deltaY) * this.width + playerX + deltaX;
            // let oldCratePosX = playerX + deltaX;
            // let oldCratePosY = playerY + deltaY;

            let newCrateIndex = (playerY + 2 * deltaY) * this.width + playerX + 2 * deltaX;
            // let newCratePosX = playerX + 2 * deltaX;
            // let newCratePosY = playerY + 2 * deltaY;

            let crate = this.crates[oldCrateIndex];
            crate.move(deltaX, deltaY, TILESIZE, function() {
                if(this.checkWin()) {
                    this.scene.scene.start('win');
                }
            }, this);

            // updating crates array
            this.crates[newCrateIndex] = crate;
            this.crates[oldCrateIndex] = null;

            // updating crate positions in level array
            this.level[oldCrateIndex] -= CRATE;
            this.level[newCrateIndex] += CRATE;

            // changing crate frame accordingly
            crate.frame = this.scene.textures.getFrame(
                'tiles',
                this.level[newCrateIndex]
            );
        }

        checkWin() : boolean {
            for(const element of this.level) {
                // not positioned a box on every spot
                if(element == SPOT) {
                    return false;
                }
            }
            return true;
        }

        addFixedTile(x: integer, y: integer, frameIndex: integer) {
            let tile = this.scene.add.sprite(x * TILESIZE, y * TILESIZE, 'tiles');
            tile.setOrigin(0,0);
            tile.frame = this.scene.textures.getFrame(
                'tiles', 
                frameIndex
            );
            this.add(tile);
        }

        drawLevel() {
            // looping trough all level rows
            for(let index = 0; index < this.level.length; index++){
                 // looping through all level columns
                // by default, there are no crates at current level position, so we set to null its
                // array entry
                this.crates[index] = null;
                let x = index % this.width;
                let y = (index - x) / this.width;
                // what do we have at row j, col i?
                switch(this.level[index]){

                    case PLAYER:
                    case PLAYER+SPOT:
                        // since the player is on the floor, I am also creating the floor tile
                        this.addFixedTile(x, y, this.level[index] - PLAYER);
                        break;

                    case CRATE:
                    case CRATE+SPOT:
                        // crate creation, both as a sprite and as a crates array item
                        let crate = new Crate(this.scene, x * TILESIZE, y * TILESIZE);
                        crate.frame = this.scene.textures.getFrame(
                            'tiles',
                            this.level[index]
                        );
                        this.crates[index] = crate;
                        // since the create is on the floor, I am also creating the floor tile
                        this.addFixedTile(x, y, this.level[index] - CRATE);
                        break;

                    default:
                        this.addFixedTile(x, y, this.level[index]);
                        break;
                }
            }
        }
    }
}
