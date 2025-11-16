// Player Class
class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.size = 1;
        this.speed = 200;
        
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setDrag(0.99);
        
        this.targetX = x;
        this.targetY = y;
    }

    moveToward(targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
    }

    update(cursors) {
        let vx = 0;
        let vy = 0;
        
        // Keyboard input
        if (cursors.left.isDown) {
            vx = -this.speed;
        }
        if (cursors.right.isDown) {
            vx = this.speed;
        }
        if (cursors.up.isDown) {
            vy = -this.speed;
        }
        if (cursors.down.isDown) {
            vy = this.speed;
        }
        
        // Mouse input (pointer movement)
        const pointer = this.scene.input.activePointer;
        if (pointer.isDown || pointer.x !== 0 || pointer.y !== 0) {
            const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.targetX, this.targetY);
            vx = Math.cos(angle) * this.speed;
            vy = Math.sin(angle) * this.speed;
        }
        
        this.sprite.setVelocity(vx, vy);
        
        // Update rotation to face direction of movement
        if (vx !== 0 || vy !== 0) {
            this.sprite.setRotation(Math.atan2(vy, vx) - Math.PI / 2);
        }
        
        this.x = this.sprite.x;
        this.y = this.sprite.y;
    }

    grow(amount) {
        this.size += amount;
        const scale = 1 + (this.size * 0.1);
        this.sprite.setScale(scale);
        this.speed = Math.max(100, 200 - this.size * 5); // Slower as you grow
    }

    destroy() {
        this.sprite.destroy();
    }
}
