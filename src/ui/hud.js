// HUD - Heads Up Display
class HUD {
    constructor(scene) {
        this.scene = scene;
        this.scoreText = scene.add.text(16, 16, '', {
            fontSize: '24px',
            fill: '#00ff00',
            fontStyle: 'bold'
        });
        
        this.sizeText = scene.add.text(16, 50, '', {
            fontSize: '18px',
            fill: '#ffff00'
        });
        
        this.timeText = scene.add.text(scene.cameras.main.width - 200, 16, '', {
            fontSize: '18px',
            fill: '#00ffff'
        });
        
        this.update();
    }

    update() {
        if (this.scene.gameManager) {
            this.scoreText.setText(`Score: ${this.scene.gameManager.score}`);
            this.sizeText.setText(`Size: ${this.scene.player.size}`);
            this.timeText.setText(`Time: ${this.scene.gameManager.getElapsedTime()}s`);
        }
    }

    showGameOver(score) {
        // Game over display is handled in gameScene.showRestartButton()
    }

    destroy() {
        this.scoreText.destroy();
        this.sizeText.destroy();
        this.timeText.destroy();
    }
}
