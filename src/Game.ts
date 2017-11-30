namespace Sokoban {    
    export class Game extends Phaser.Game {    
        constructor() {    
            super(1000, 600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            // this.state.add('MainMenu', MainMenu, false);
            this.state.add('GamePlay', GamePlay, false);
            this.state.add('Win', Win, false)

            this.state.start('Boot');
        }    
    }    
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new Sokoban.Game();
}
