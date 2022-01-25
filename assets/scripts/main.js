let config = {
    type: Phaser.AUTO,
    width: 500,
    height: 300,
    scene: [BootScene, PreloadScene, StartScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

let game = new Phaser.Game(config);