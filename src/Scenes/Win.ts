namespace Sokoban {

    export class Win extends Phaser.Scene {

        constructor() {
            super({
                key: 'win'
            })
        }

        create() {
            this.add.text(WIDTH / 2,HEIGHT / 2,'You won!', {
                fontFamily: 'Arial',
                fontSize: 50,
                color: '#FFFFFF',
            });
            this.input.keyboard.on('keydown-SPACE', () => {
                const id = Math.floor(Math.random() * 999);
                let client = new ApiClient();
                client.getLevel(id)
                    .then(level => {
                        window.location.href = "/bin/?level=" + id;
                    });
            });
            this.input.keyboard.addCapture('SPACE');
        }
    }
}
