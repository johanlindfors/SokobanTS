/// <reference path="../Constants.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="Crate.ts" />

namespace Sokoban {
    export interface MapConfig {
        level: string;
        id: number;
    }

    export class Map extends Phaser.GameObjects.Group {
        private level: number[];
        private crates: Crate[];
        playerStartIndex: number;
        width: number;
        height: number;
        id: number;

        constructor(scene: Phaser.Scene, mapConfig: MapConfig) {
            super(scene);
            let parsedMap = Helpers.parse(mapConfig.level);
            this.id = mapConfig.id;
            this.level = parsedMap[0];
            this.width = parsedMap[1];
            this.height = parsedMap[2];
            this.crates = [];
        }

        isWalkable(x: number, y: number) {
            let index = y * this.width + x;
            return this.level[index] == EMPTY || this.level[index] == SPOT;
        }

        isCrate(x: number, y: number){
            let index = y * this.width + x;
            return this.level[index] == CRATE || this.level[index] == CRATE+SPOT;
        }

        moveCrate(deltaX: number, deltaY: number, playerX: number, playerY: number) {
            let oldCrateIndex = (playerY + deltaY) * this.width + playerX + deltaX;
            let newCrateIndex = (playerY + 2 * deltaY) * this.width + playerX + 2 * deltaX;

            let crate = this.crates[oldCrateIndex];
            crate.move(deltaX, deltaY, function() {
                if(this.checkWin()) {
                    this.scene.scene.start('win');
                }
            }, this);

            this.crates[newCrateIndex] = crate;
            this.crates[oldCrateIndex] = null;

            this.level[oldCrateIndex] -= CRATE;
            this.level[newCrateIndex] += CRATE;

            crate.frame = this.scene.textures.getFrame(
                'tiles',
                this.level[newCrateIndex]
            );
        }

        private checkWin() : boolean {
            for(const element of this.level) {
                if(element == SPOT) {
                    return false;
                }
            }
            return true;
        }

        private addFixedTile(x: integer, y: integer, frameIndex: integer) {
            let tile = this.scene.add.sprite(x * TILESIZE, y * TILESIZE, 'tiles');
            tile.setOrigin(0,0);
            tile.frame = this.scene.textures.getFrame(
                'tiles', 
                frameIndex
            );
            this.add(tile);
        }

        initialize() {
            for(let index = 0; index < this.level.length; index++){
                this.crates[index] = null;
                let x = index % this.width;
                let y = (index - x) / this.width;

                switch(this.level[index]){

                    case PLAYER:
                    case PLAYER+SPOT:
                        this.playerStartIndex = index;
                        this.addFixedTile(x, y, this.level[index] - PLAYER);
                        this.level[index] -= PLAYER;
                        break;

                    case CRATE:
                    case CRATE+SPOT:
                        let crate = new Crate(this.scene, x, y);
                        crate.frame = this.scene.textures.getFrame(
                            'tiles',
                            this.level[index]
                        );
                        this.crates[index] = crate;
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
