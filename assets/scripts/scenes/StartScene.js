class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }
    create() {
        this.createBackground();
        this.createText();
        this.setEvents();
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }
    createText() {
        this.add.text(config.width / 2, 100, 'Collect all coins!', {
            font: '30px Boby',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        this.add.text(config.width / 2, 200, 'Tap to start', {
            font: '30px Boby',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
    }
    setEvents() {
        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}