module Sokoban {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			// //	These are the assets we loaded in Boot.js
			// this.preloadBar = this.add.sprite(300, 400, 'preloadBar');

			// //	This sets the preloadBar sprite as a loader sprite.
			// //	What that does is automatically crop the sprite from 0 to full-width
			// //	as the files below are loaded in.
			// this.load.setPreloadSprite(this.preloadBar);

			// //	Here we load the rest of the assets our game needs.
			// //	As this is just a Project Template I've not provided these assets, swap them for your own.
			// this.load.image('titlepage', 'assets/titlepage.jpg');
			// this.load.audio('titleMusic', 'assets/title.mp3', true);
			// this.load.image('logo', 'assets/logo.png');
            this.load.spritesheet('tiles', 'assets/tiles.png', 40, 40, 7);
            // this.load.image('level1', 'assets/level1.png');
			// //	+ lots of other required assets here

		}

		create() {
            var level = [[1,1,1,1,1,1,1,1],
                         [1,0,0,1,1,1,1,1],
                         [1,0,0,1,1,1,1,1],
                         [1,0,0,0,0,0,0,1],
                         [1,1,4,2,1,3,0,1],
                         [1,0,0,0,1,0,0,1],
                         [1,0,0,0,1,1,1,1],
                         [1,1,1,1,1,1,1,1]];

            var newLevel = [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1],
                [1,0,1,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
                [1,0,1,2,2,2,1,0,3,3,3,3,3,3,3,3,0,1,0,1,0,0,1],
                [1,0,1,2,2,3,0,0,3,0,0,0,0,0,0,3,1,2,0,3,0,0,1],
                [1,0,1,0,0,0,1,0,0,0,3,3,3,3,3,3,2,1,0,1,0,0,1],
                [1,0,1,2,2,2,1,0,1,0,2,2,2,2,2,1,0,0,0,2,1,1,1],
                [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,1],
                [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]
			this.game.state.start('Level', true, false, newLevel);
		}
	}
}