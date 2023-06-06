namespace Sokoban {

    export class Win extends Phaser.Scene {

        constructor() {
            super({
                key: 'win'
            })
        }

        create() {
            let winLabel = this.add.text(100,100,'You won!', { 
                fontFamily: 'Arial',
                fontSize: 50,
                color: '#FFFFFF'
            });
            this.input.keyboard.on('keydown-SPACE', function(){
                let level5String = "#######|#. $ .#|# $@$ #|#. $ .#|#######";                
                this.game.state.start('GamePlay', true, false, level5String);
            });
            this.input.keyboard.addCapture('SPACE');
        }
    }
}
    