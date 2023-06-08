/// <reference path="Scenes/Boot.ts" />
/// <reference path="Scenes/GamePlay.ts" />
/// <reference path="Scenes/Win.ts" />

let config = {
    width: Sokoban.WIDTH,
    height: Sokoban.HEIGHT,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'content',
        width: Sokoban.WIDTH,
        height: Sokoban.HEIGHT
    },
    scene: [
        Sokoban.Boot,
        Sokoban.GamePlay,
        Sokoban.Win
    ]
};

let game = new Phaser.Game(config);
