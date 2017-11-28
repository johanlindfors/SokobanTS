module Sokoban {

    const EMPTY = 0;
    const WALL = 1;
    const SPOT = 2;
    const CRATE = 3;
    const PLAYER = 4;

    class Level extends Phaser.State {

        level: Number[][];
        // a tile is walkable when it's an empty tile or a spot tile
        isWalkable(posX: number, posY: number) {
		    return this.level[posY][posX] == EMPTY || this.level[posY][posX] == SPOT;
        }

        // a tile is a crate when it's a... guess what? crate, or it's a crate on its spot
        isCrate(posX: number, posY: number){
            return this.level[posY][posX] == CRATE || this.level[posY][posX] == CRATE+SPOT;	
        }
    }
	

	export class Level1 extends Level {    
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Sokoban.Player;
        level: Array<Array<Number>> = [[1,1,1,1,1,1,1,1],[1,0,0,1,1,1,1,1],[1,0,0,1,1,1,1,1],[1,0,0,0,0,0,0,1],[1,1,4,2,1,3,0,1],[1,0,0,0,1,0,0,1],[1,0,0,0,1,1,1,1],[1,1,1,1,1,1,1,1]];
        undoArray;
        crates;

        create() {
            this.player = new Player(this.game, 130, 284);
        }

    }
}