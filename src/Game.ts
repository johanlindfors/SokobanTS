namespace Sokoban {    
    export class Game extends Phaser.Game {    
        constructor() {    
            super({
                width: 1000,
                height: 600,
                type: Phaser.AUTO,
                scale: {
                    mode: Phaser.Scale.FIT,
                    parent: 'content',
                    width: 1000,
                    height: 600
                },
                scene: [
                    Boot,
                    Preloader,
                    GamePlay,
                    Win
                ]
            });
        }    
    }    
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new Sokoban.Game();
}
