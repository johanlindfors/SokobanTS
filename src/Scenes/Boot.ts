/// <reference path="../API/ApiClient.ts" />

namespace Sokoban {

	export class Boot extends Phaser.Scene {
        constructor() {
            super({
                key: 'boot'
            })
        }

        init() {
            if (!this.game.device.os.desktop) {
                this.scale.scaleMode = Phaser.Scale.RESIZE;
            }    
            this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
        }

        preload() {
            this.load.spritesheet('tiles', 'assets/tiles.png', { frameWidth: TILESIZE, frameHeight: TILESIZE });
		}

		create() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const levelParam = urlParams.get('level');
            
            const id = levelParam ? parseInt(levelParam) : Math.floor(Math.random() * 999);

            let client = new ApiClient();
            client.getLevel(id)
                .then(level => {
                    this.scene.start('gamePlay', { level, id });
                    this.scene.remove('boot');
                });
		}
	}
}
