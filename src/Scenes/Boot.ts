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
            this.load.spritesheet('tiles', 'assets/tiles.png', { frameWidth: 40, frameHeight: 40 });
		}

		create() {
            let level = [[1,1,1,1,1,1,1,1],
                         [1,0,0,1,1,1,1,1],
                         [1,0,0,1,1,1,1,1],
                         [1,0,0,0,0,0,0,1],
                         [1,1,4,2,1,3,0,1],
                         [1,0,0,0,1,0,0,1],
                         [1,0,0,0,1,1,1,1],
                         [1,1,1,1,1,1,1,1]];

            let newLevel = [
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
            ];

            let simpleLevel = [
                [1,1,1,1,1,1,1],
                [1,2,0,3,0,2,1],
                [1,0,3,4,3,0,1],
                [1,2,0,3,0,2,1],
                [1,1,1,1,1,1,1]
            ];

            let test = "##########|##########|##########|##########|##@#######|# $   ####|# ..$$ ###|#  $.  ###|#. #    ##|##########|"
            let level4String = "#######|#.   .#|# $@$ #|# ### #|# $ $ #|#.   .#|#######";
            let level5String = "##########|##### ####|#####.####|#####$####|####  ## #|#### $.$ #|####@$   #|#### .## #|##      .#|##########";

            let client = new ApiClient();

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const levelParam = urlParams.get('level');
            
            const id = levelParam ? parseInt(levelParam) : Math.floor(Math.random() * 999);

            //let id = Math.floor(Math.random() * 999);
            client.getLevel(id)
                .then(levelString => {
                    console.log(levelString);
                    this.scene.start('gamePlay', { level: levelString });
                });
		}
	}
}
