// Enemy Class
class Enemy {
    constructor(scene, x, y, size, group) {
        this.scene = scene;
        this.size = size;
        this.speed = 100 - size * 10;
        
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(1, 1);
        
        // Scale based on size
        const scale = 0.8 + size * 0.3;
        this.sprite.setScale(scale);
        
        group.add(this.sprite);
    }

    update(player) {
        if (!this.sprite || !this.sprite.active) return;
        
        // Chase player
        const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, player.sprite.x, player.sprite.y);
        const vx = Math.cos(angle) * this.speed;
        const vy = Math.sin(angle) * this.speed;
        
        this.sprite.setVelocity(vx, vy);
        this.sprite.setRotation(angle - Math.PI / 2);
    }

    destroy() {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}
