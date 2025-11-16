// Menu Scene
class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);
        
        // Title
        this.add.text(width / 2, 80, 'FEEDING FRENZY', {
            fontSize: '48px',
            fill: '#00ff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        
        // Instructions
        const instructions = [
            'Eat smaller fish to grow!',
            'Avoid larger fish - they will eat you!',
            'Use ARROW KEYS or MOUSE to move',
            'Eat as much as you can!'
        ];
        
        let yPos = 180;
        instructions.forEach(text => {
            this.add.text(width / 2, yPos, text, {
                fontSize: '16px',
                fill: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
            yPos += 40;
        });
        
        // Start button
        const startBtn = this.add.rectangle(width / 2, 420, 200, 50, 0xff6b00)
            .setInteractive()
            .on('pointerover', () => startBtn.setFillStyle(0xff8800))
            .on('pointerout', () => startBtn.setFillStyle(0xff6b00))
            .on('pointerdown', () => {
                this.scene.start('Game');
            });
        
        this.add.text(width / 2, 420, 'START GAME', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Credits
        this.add.text(width / 2, height - 30, 'Made with Phaser.io | Deployed on GitHub Pages', {
            fontSize: '12px',
            fill: '#888888',
            align: 'center'
        }).setOrigin(0.5);
    }
}
