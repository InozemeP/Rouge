class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }
    preload() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);

        this.load.image('pl1', 'assets/sprites/player1.png');
        this.load.image('pl2', 'assets/sprites/player2.png');

        this.load.image('skull1', 'assets/sprites/skull1.png');
        this.load.image('skull2', 'assets/sprites/skull2.png');

        this.load.image('skeleton1', 'assets/sprites/skeleton1.png');
        this.load.image('skeleton2', 'assets/sprites/skeleton2.png');

        this.load.image('topWall', 'assets/sprites/topWall.png');
        this.load.image('botWall', 'assets/sprites/botWall.png');
        this.load.image('leftWall', 'assets/sprites/leftWall.png');
        this.load.image('rightWall', 'assets/sprites/rightWall.png');
        this.load.image('home', 'assets/sprites/home.png');

        this.load.image('coin_1', 'assets/sprites/coin_1.png');
        this.load.image('coin_2', 'assets/sprites/coin_2.png');
        this.load.image('coin_3', 'assets/sprites/coin_3.png');
        this.load.image('coin_4', 'assets/sprites/coin_4.png');


        this.load.image('bord', 'assets/sprites/bord.png');
        this.load.image('hor', 'assets/sprites/hor.png');
        this.load.image('horTop', 'assets/sprites/horTop.png');
        this.load.image('box', 'assets/sprites/box.png');
    }
    create() {
        this.scene.start('Start');
    }
}