class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    };

    create() {
        this.k = 1;
        this.createBackground();
        this.createWalls();
        this.createAnimations();
        this.createStaticObjects();
        this.createCoins();
        this.createPlayer();
        this.createEvents();
        this.createEnemiesSkeletons();
        this.createEnemiesSkulls();
        this.createColliders();
        this.createTextOfCoinsRemaining();
        this.createCamera();
    };

    createBackground() {
        this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);
    };
    createWalls() {
        this.walls = this.physics.add.staticGroup();
        this.walls.create(0, config.height - 10, 'leftWall').setOrigin(0, 1).refreshBody();
        this.walls.create(config.width - 10, config.height - 10, 'rightWall').setOrigin(0, 1).refreshBody();
        this.walls.create(0, 0, 'topWall').setOrigin(0).refreshBody();
        this.walls.create(0, config.height, 'botWall').setOrigin(0, 1).refreshBody();
    };
    createCoins() {
        this.coins = this.physics.add.staticGroup();

        for(let i = 44; i < 105; i = i + 15) {
            this.coins.create(i, 277, 'coin_1').play('coinAnimation');
        }

        for(let i = 20; i < 66; i = i + 15) {
            this.coins.create(i, 22, 'coin_1').play('coinAnimation');
        }

        for(let i = 245; i < 276; i = i + 15) {
            this.coins.create(i, 211, 'coin_1').play('coinAnimation');
        }

        for(let i = 450; i < 481; i = i + 15) {
            this.coins.create(i, 275, 'coin_1').play('coinAnimation');
        }

        for(let i = 21; i < 67; i = i + 15) {
            this.coins.create(387, i, 'coin_1').play('coinAnimation');
        }

        for(let i = 402; i < 478; i = i + 15) {
            this.coins.create(i, 21, 'coin_1').play('coinAnimation');
        }

        this.coins.create(400, 225, 'coin_1').play('coinAnimation');
    };
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
    };
    createPlayer() {
        this.player = this.physics.add.sprite(450, 120, 'pl1').setCollideWorldBounds(true);
    };
    createColliders() {
        this.physics.add.collider(this.player, this.staticObjects);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.skeletons, this.death, null, this);
        this.physics.add.overlap(this.player, this.skulls, this.death, null, this);
    };
    createCamera() {
        this.cameras.main.startFollow(this.player, false, 0.09, 0.09).setZoom(1.5);
    };
    createEnemiesSkeletons() {
        this.skeletons = this.physics.add.group();

        this.skeleton1 = this.skeletons.create(155, 277, 'skeleton1');
        this.skeleton2 = this.skeletons.create(195, 23, 'skeleton1');
        this.skeleton3 = this.skeletons.create(400, 277, 'skeleton1');
    };
    createEnemiesSkulls() {
        this.skulls = this.physics.add.group();

        this.skull1 = this.skulls.create(386, 240, 'skull1');
        this.skull2 = this.skulls.create(240, 211, 'skull1');
        this.skull3 = this.skulls.create(370, 86, 'skull1');

    };
    createTextOfCoinsRemaining() {
        this.text = this.add.text(295, 50,'', {
            font: '10px Boby',
            fill: '#FFFFFF'
        }).setOrigin(0).setScrollFactor(0);
    };
    createAnimations() {
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
        });

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

        this.anims.create({
            key: 'enLeft',
            frames: [
                { key: 'skeleton2'}
            ],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'enRight',
            frames: [
                { key: 'skeleton1'}
            ],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'skullLeft',
            frames: [
                {key: 'skull2'}
            ],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'skullRight',
            frames: [
                {key: 'skull1'}
            ],
            frameRate: 1,
            repeat: -1
        });
    };
    createEvents() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };


    update() {
        this.playerMove();
        this.skeletonsMove();
        this.skullsMove();
        this.skull1Move();
        this.text.setText(`Coins left: ${this.coins.countActive(true)}`);
    };


    playerMove() {
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
    };

    skullsMove() {
        this.skull1Move();
        this.skull2Move();
        this.skull3Move();
    };
    skull1Move() {
        this.skull1.setVelocity(0);

        if(this.k === 1) {
            this.skull1.setVelocityY(-140);
            this.skull1.play('skullRight');
            if(this.skull1.y < 213){
                this.k = 2;
            }
        }

        if(this.k === 2) {
            this.skull1.setVelocityX(140);
            if(this.skull1.x > 420) {
                this.k = 3;
            }
        }

        if(this.k === 3) {
            this.skull1.setVelocityY(140);
            this.skull1.play('skullLeft');
            if(this.skull1.y > 239) {
                this.k = 4;
            }
        }

        if(this.k === 4) {
            this.skull1.setVelocityX(-140);
            if(this.skull1.x < 388) {
                this.k = 1;
            }
        }
    };
    skull2Move() {
        if (this.skull2.x >= 282) {
            this.skull2.setVelocityX(-90);
            this.skull2.play('skullLeft');
        }
        else if (this.skull2.x <= 240) {
            this.skull2.setVelocityX(90);
            this.skull2.play('skullRight');
        }
    };
    skull3Move() {
        if (this.skull3.y >= 140) {
            this.skull3.setVelocityY(-90);
        }
        else if (this.skull3.y <= 86) {
            this.skull3.setVelocityY(90);
        }
    };

    skeletonsMove() {
        this.skeleton1Move();
        this.skeleton2Move();
        this.skeleton3Move();
    };
    skeleton1Move() {

        if (this.skeleton1.x >= 155) {
            this.skeleton1.setVelocityX(-100);
            this.skeleton1.play('enLeft');
        }
        else if (this.skeleton1.x <= 32) {
            this.skeleton1.setVelocityX(100);
            this.skeleton1.play('enRight');
        }
    };
    skeleton2Move() {

        if (this.skeleton2.x >= 195) {
            this.skeleton2.setVelocityX(-100);
            this.skeleton2.play('enLeft');
        }
        else if (this.skeleton2.x <= 40) {
            this.skeleton2.setVelocityX(100);
            this.skeleton2.play('enRight');
        }
    };
    skeleton3Move() {
        if (this.skeleton3.x >= 400) {
            this.skeleton3.setVelocityX(-100);
            this.skeleton3.play('enLeft');
        }
        else if (this.skeleton3.x <= 300) {
            this.skeleton3.setVelocityX(100);
            this.skeleton3.play('enRight');
        }
    };


    death() {
        this.physics.pause();
        this.player.setTint(0xff0000);

        this.time.delayedCall(600, () => {
            this.add.text(this.player.x, this.player.y,`YOU LOOSE! Tap to restart!`, {
                font: '15px Boby',
                fill: '#FFFFFF'
            }).setOrigin(0.5);

            this.input.on('pointerdown', () => {
                this.scene.start('Game');
            });
        });
    };

    collectCoin(player, coin) {
        coin.disableBody(true, true);

        if (this.coins.countActive(true) === 0) {
            this.physics.pause();

            this.time.delayedCall(600, () => {
                this.add.text(this.player.x, this.player.y, `YOU WIN! Tap to restart`, {
                    font: '15px Boby',
                    fill: '#FFFFFF'
                }).setOrigin(0.5);

                this.input.on('pointerdown', () => {
                    this.scene.start('Game');
                });
            });

        }

    };










}



