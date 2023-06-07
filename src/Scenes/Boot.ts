namespace Sokoban {

    export class Boot extends Phaser.Scene {

        constructor() {
            super({
                key: 'boot',
            });
        }

        init() {
            if (!this.game.device.os.desktop) {
                this.scale.scaleMode = Phaser.Scale.RESIZE;
            }    
            //this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
        }

        create() {
            this.scene.start('preloader');
        }
    }
}
    