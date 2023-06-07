/// <reference path="Scenes/Boot.ts" />
/// <reference path="Scenes/GamePlay.ts" />
/// <reference path="Scenes/Win.ts" />

let config = {
    width: 1000,
    height: 600,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'content',
        width: 1000,
        height: 600
    },
    scene: [
        Sokoban.Boot,
        Sokoban.GamePlay,
        Sokoban.Win
    ]
};

let game = new Phaser.Game(config);
