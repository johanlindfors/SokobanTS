namespace Sokoban {

    export class Win extends Phaser.State {

        create() {
            let winLabel = this.game.add.text(100,100,'You won!', { font: '50px Arial', fill: '#FFFFFF'});
            this.game.input.keyboard.addCallbacks(this, function(){
                let level5String = "#######|#. $ .#|# $@$ #|#. $ .#|#######";                
                this.game.state.start('GamePlay', true, false, level5String);
            });
        }
    }
}
    