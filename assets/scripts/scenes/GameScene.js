class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.createBackground();
        this.createWalls();
        this.createStaticObjects()
        this.createCoins();
        this.createPlayer();
        this.createEvents();
        this.createCamera();
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.play('left');
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(100);
            this.player.play('right');
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(100);
        }
    }

    createBackground() {
        this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
    }

    createWalls() {
        this.walls = this.physics.add.staticGroup();
        this.walls.create(0, config.height - 10, 'leftWall').setOrigin(0, 1).refreshBody();
        this.walls.create(config.width - 10, config.height - 10, 'rightWall').setOrigin(0, 1).refreshBody();
        this.walls.create(0, 0, 'topWall').setOrigin(0).refreshBody();
        this.walls.create(0, config.height, 'botWall').setOrigin(0, 1).refreshBody();
    }

    createCoins() {
        this.anims.create({
            key: 'coinAnimation',
            frames: [
                { key: 'coin_1'},
                { key: 'coin_2'},
                { key: 'coin_3'},
                { key: 'coin_4'}
            ],
            frameRate: 9,
            repeat: -1
        })

        this.coins = this.physics.add.staticGroup();

        this.coins.create(57, 277, 'coin_1').play('coinAnimation');
        this.coins.create(72, 277, 'coin_1').play('coinAnimation');
        this.coins.create(87, 277, 'coin_1').play('coinAnimation');
        this.coins.create(102, 277, 'coin_1').play('coinAnimation');

        this.coins.create(20, 22, 'coin_1').play('coinAnimation');
        this.coins.create(35, 22, 'coin_1').play('coinAnimation');
        this.coins.create(50, 22, 'coin_1').play('coinAnimation');
        this.coins.create(65, 22, 'coin_1').play('coinAnimation');

        this.coins.create(245, 211, 'coin_1').play('coinAnimation');
        this.coins.create(275, 211, 'coin_1').play('coinAnimation');

        this.coins.create(480, 275, 'coin_1').play('coinAnimation');
        this.coins.create(465, 275, 'coin_1').play('coinAnimation');
        this.coins.create(450, 275, 'coin_1').play('coinAnimation');
    }

    createStaticObjects() {
        this.staticObjects = this.physics.add.staticGroup();
        this.staticObjects.create(74, 215, 'home');
        this.staticObjects.create(80, 38, 'bord');
        this.staticObjects.create(426, 255, 'hor');
        this.staticObjects.create(370, 230, 'horTop');
        this.staticObjects.create(370, 46, 'horTop');
        this.staticObjects.create(370, 174, 'box');
        this.staticObjects.create(260, 177, 'box');
        this.staticObjects.create(260, 245, 'box');
    }

    createPlayer() {
        this.anims.create({
            key: 'left',
            frames: [
                { key: 'pl2'}
            ],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: [
                { key: 'pl1'}
            ],
            frameRate: 1,
            repeat: -1
        });

        this.player = this.physics.add.sprite(450, 120, 'pl1');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.staticObjects);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);

        if (this.coins.countActive(true) === 0) {
            this.scene.start('Start');
        }
    }

    createEvents() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createCamera() {
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09).setZoom(1);
    }
}