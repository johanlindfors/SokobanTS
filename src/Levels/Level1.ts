module Sokoban {

    const EMPTY = 0;
    const WALL = 1;
    const SPOT = 2;
    const CRATE = 3;
    const PLAYER = 4;

    class Level extends Phaser.State {

        level: number[][];
        player: Player ;
        playerMoving: Boolean;
        tileSize: number = 40;
        undoArray;
        crates;

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
            if(this.isWalkable(this.player.posX+deltaX,this.player.posY+deltaY)){
                // push current situation in the undo array
                this.undoArray.push(this.copyArray(this.level));
                this.movePlayer(deltaX,deltaY);
                return;
            }
            // if the destination tile is a crate... 
            if(this.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)){
                // ...if  after the create there's a walkable tils...
                if(this.isWalkable(this.player.posX + 2 * deltaX, this.player.posY + 2 * deltaY)) {
                    // push current situation in the undo array
                    this.undoArray.push(this.copyArray(this.level));
                    // move the crate
                    this.moveCrate(deltaX,deltaY);			  
                    // move the player	
                    sthis.movePlayer(deltaX,deltaY);
                }
            }
        }
        // function to move the player
        movePlayer(deltaX: number,deltaY: number){
            // now the player is moving
            this.playerMoving = true;
            // moving with a 1/10s tween
            var playerTween = this.game.add.tween(this.player);
            playerTween.to({
                x:this.player.x + deltaX * this.tileSize,
                y:this.player.y + deltaY * this.tileSize
            }, 100, Phaser.Easing.Linear.None,true);
            // setting a tween callback 
            playerTween.onComplete.add(function(){
                // now the player is not moving anymore
                this.playerMoving = false;
            }, this);
            // updating player old position in level array   
            this.level[this.player. posY][this.player.posX] - PLAYER;  
            // updating player custom posX and posY attributes
            this.player.posX+=deltaX;
            this.player.posY+=deltaY;
            // updating player new position in level array 
            this.level[this.player.posY][this.player.posX] += PLAYER;  
            // changing player frame accordingly  
            this.player.frame = this.level[this.player.posY][this.player.posX];
        }
    }
	

	export class Level1 extends Level {    
        background: Phaser.Sprite;
        music: Phaser.Sound;
        
        create() {
            this.player = new Player(this.game, 130, 284);
        
            this.level = [[1,1,1,1,1,1,1,1],
                          [1,0,0,1,1,1,1,1],
                          [1,0,0,1,1,1,1,1],
                          [1,0,0,0,0,0,0,1],
                          [1,1,4,2,1,3,0,1],
                          [1,0,0,0,1,0,0,1],
                          [1,0,0,0,1,1,1,1],
                          [1,1,1,1,1,1,1,1]];
        }

    }
}