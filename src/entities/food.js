// Food Class
class Food {
    constructor(scene, x, y, group) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'food');
        this.sprite.setBounce(1, 1);
        this.sprite.setCollideWorldBounds(true);
        
        // Random movement
        const angle = Math.random() * Math.PI * 2;
        const speed = Phaser.Math.Between(20, 60);
        this.sprite.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        
        group.add(this.sprite);
    }

    destroy() {
        this.sprite.destroy();
    }
}
