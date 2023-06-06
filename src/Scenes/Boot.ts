namespace Sokoban {

    export class Boot extends Phaser.Scene {

        constructor() {
            super({
                key: 'boot',
                physics: {
                    arcade: {
                        gravity: { y: 200 }
                    }
                }
            });
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            //this.input.addPointer(1);

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            //this.stage.disableVisibilityChange = true;


            // if (this.game.device.desktop) {
            //     //  If you have any desktop specific settings, they can go in here
            //this.scale.pageAlignHorizontally = true;
            // }
            // else {
            //     //  Same goes for mobile settings.
            //     //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            //     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //     this.scale.setMinMax(480, 260, 1024, 768);
            //     this.scale.forceLandscape = true;
            //     this.scale.pageAlignHorizontally = true;
            // }    
        }

        create() {
            //  By this point the preloader assets have loaded to the cache, we've set the game settings
            //  So now let's start the real preloader going
            this.scene.start('preloader');
        }
    }
}
    