// Boot Scene - Initialize game assets
class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Create simple graphics for player fish
        this.createPlayerGraphics();
        // Create food graphics
        this.createFoodGraphics();
        // Create enemy graphics
        this.createEnemyGraphics();
    }

    create() {
        this.scene.start('Menu');
    }

    createPlayerGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x00ff00, 1);
        graphics.beginPath();
        graphics.ellipse(0, 0, 20, 12);
        graphics.closePath();
        graphics.fillPath();
        graphics.fillStyle(0xffff00, 1);
        graphics.fillCircle(15, 0, 4);
        graphics.generateTexture('player', 40, 24);
        graphics.destroy();
    }

    createFoodGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffa500, 1);
        graphics.beginPath();
        graphics.ellipse(0, 0, 6, 6);
        graphics.closePath();
        graphics.fillPath();
        graphics.generateTexture('food', 16, 16);
        graphics.destroy();
    }

    createEnemyGraphics() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000, 1);
        graphics.beginPath();
        graphics.ellipse(0, 0, 16, 10);
        graphics.closePath();
        graphics.fillPath();
        graphics.fillStyle(0xffff00, 1);
        graphics.fillCircle(12, 0, 3);
        graphics.generateTexture('enemy', 40, 24);
        graphics.destroy();
    }
}
