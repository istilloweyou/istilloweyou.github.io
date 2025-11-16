// Game Scene - Main gameplay
class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // Initialize game manager
        this.gameManager = new GameManager(this);
        
        // Initialize HUD
        this.hud = new HUD(this);
        
        // Create player
        this.player = new Player(this, 400, 300);
        
        // Create groups
        this.foodGroup = this.physics.add.group();
        this.enemyGroup = this.physics.add.group();
        
        // Spawn initial food
        for (let i = 0; i < 50; i++) {
            this.spawnFood();
        }
        
        // Spawn initial enemies
        for (let i = 0; i < 5; i++) {
            this.spawnEnemy();
        }
        
        // Collision detection
        this.physics.add.overlap(this.player, this.foodGroup, this.eatFood, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.hitEnemy, null, this);
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointermove', (pointer) => {
            this.player.moveToward(pointer.x, pointer.y);
        });
        
        // Game loop
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnFood,
            callbackScope: this,
            loop: true
        });
        
        this.time.addEvent({
            delay: 3000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.player.update(this.cursors);
        this.gameManager.update();
        
        // Update enemies
        this.enemyGroup.children.entries.forEach(enemy => {
            enemy.update(this.player);
        });
        
        // Remove food that's out of bounds
        this.foodGroup.children.entries.forEach(food => {
            if (!this.physics.world.bounds.contains(food.x, food.y)) {
                food.destroy();
            }
        });
        
        // Remove enemies that are way out of bounds
        this.enemyGroup.children.entries.forEach(enemy => {
            if (Math.hypot(enemy.x - 400, enemy.y - 300) > 1000) {
                enemy.destroy();
            }
        });
    }

    spawnFood() {
        if (this.gameManager.isGameOver) return;
        
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        new Food(this, x, y, this.foodGroup);
    }

    spawnEnemy() {
        if (this.gameManager.isGameOver) return;
        
        const size = Phaser.Math.Between(2, 4);
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        new Enemy(this, x, y, size, this.enemyGroup);
    }

    eatFood(player, food) {
        this.gameManager.addScore(10);
        this.player.grow(1);
        food.destroy();
        
        // Spawn new food
        this.spawnFood();
    }

    hitEnemy(player, enemy) {
        if (player.size > enemy.size) {
            // Player eats enemy
            this.gameManager.addScore(enemy.size * 50);
            this.player.grow(enemy.size);
            enemy.destroy();
        } else {
            // Enemy eats player - Game Over
            this.gameOver();
        }
    }

    gameOver() {
        this.gameManager.gameOver();
        this.hud.showGameOver(this.gameManager.score);
        
        // Disable input
        this.input.keyboard.enabled = false;
        this.input.enabled = false;
        
        // Show restart button after delay
        this.time.delayedCall(1000, () => {
            this.showRestartButton();
        });
    }

    showRestartButton() {
        const { width, height } = this.cameras.main;
        
        // Semi-transparent overlay
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
        
        // Game Over text
        this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
            fontSize: '48px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Score text
        this.add.text(width / 2, height / 2, `Score: ${this.gameManager.score}`, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Restart button
        const restartBtn = this.add.rectangle(width / 2, height / 2 + 80, 200, 50, 0xff6b00)
            .setInteractive()
            .on('pointerover', () => restartBtn.setFillStyle(0xff8800))
            .on('pointerout', () => restartBtn.setFillStyle(0xff6b00))
            .on('pointerdown', () => {
                this.scene.restart();
            });
        
        this.add.text(width / 2, height / 2 + 80, 'RESTART', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Menu button
        const menuBtn = this.add.rectangle(width / 2, height / 2 + 140, 200, 50, 0x444444)
            .setInteractive()
            .on('pointerover', () => menuBtn.setFillStyle(0x666666))
            .on('pointerout', () => menuBtn.setFillStyle(0x444444))
            .on('pointerdown', () => {
                this.scene.start('Menu');
            });
        
        this.add.text(width / 2, height / 2 + 140, 'MENU', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }
}
