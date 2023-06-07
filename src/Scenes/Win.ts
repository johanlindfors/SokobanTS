namespace Sokoban {

    export class Win extends Phaser.Scene {

        constructor() {
            super({
                key: 'win'
            })
        }

        create() {
            this.add.text(100,100,'You won!', { 
                fontFamily: 'Arial',
                fontSize: 50,
                color: '#FFFFFF'
            });

            this.input.keyboard.on('keydown-SPACE', () => {
                let level5String = "#######|#. $ .#|# $@$ #|#. $ .#|#######";                
                this.game.scene.start('gamePlay', { level: level5String });
                this.scene.stop();
            });
            this.input.keyboard.addCapture('SPACE');            
        }
    }
}
