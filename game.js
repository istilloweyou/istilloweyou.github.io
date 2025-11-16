class Fish {
    constructor(x, y, size, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isPlayer = isPlayer;
        this.vx = isPlayer ? 0 : (Math.random() - 0.5) * 3;
        this.vy = isPlayer ? 0 : (Math.random() - 0.5) * 3;
        this.color = isPlayer ? '#FFD700' : this.generateColor();
    }

    generateColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(canvas) {
        if (!this.isPlayer) {
            // Keep small fish in bounds with wrapping
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;

            // Random direction changes
            if (Math.random() < 0.01) {
                this.vx = (Math.random() - 0.5) * 3;
                this.vy = (Math.random() - 0.5) * 3;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Calculate angle based on velocity
        let angle = 0;
        if (!this.isPlayer) {
            angle = Math.atan2(this.vy, this.vx);
        }
        ctx.rotate(angle);

        // Draw fish body (circle for simplicity, can be enhanced)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.size * 0.5, -this.size * 0.2, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.size * 0.55, -this.size * 0.2, this.size * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size * 0.3;
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.7, 0);
        ctx.lineTo(-this.size * 1.3, -this.size * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-this.size * 0.7, 0);
        ctx.lineTo(-this.size * 1.3, this.size * 0.5);
        ctx.stroke();

        ctx.restore();
    }

    getDistance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    canEat(other) {
        return this.size > other.size * 1.3 && this.getDistance(other) < this.size + other.size;
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.setupCanvas();
        
        this.player = null;
        this.smallFish = [];
        this.score = 0;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.mouseX = canvas.width / 2;
        this.mouseY = canvas.height / 2;

        this.setupEventListeners();
    }

    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = Math.min(800, rect.width * 0.95);
        this.canvas.height = 500;
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.start());
    }

    start() {
        this.player = new Fish(this.canvas.width / 2, this.canvas.height / 2, 15, true);
        this.smallFish = [];
        this.score = 0;
        this.level = 1;
        this.gameRunning = true;
        this.gamePaused = false;
        document.getElementById('gameOver').classList.add('hidden');
        this.spawnSmallFish(15);
        this.gameLoop();
    }

    togglePause() {
        if (this.gameRunning) {
            this.gamePaused = !this.gamePaused;
            document.getElementById('pauseBtn').textContent = this.gamePaused ? 'Resume' : 'Pause';
            if (!this.gamePaused) {
                this.gameLoop();
            }
        }
    }

    spawnSmallFish(count) {
        for (let i = 0; i < count; i++) {
            let x, y, distance;
            // Spawn fish away from player
            do {
                x = Math.random() * this.canvas.width;
                y = Math.random() * this.canvas.height;
                distance = Math.sqrt(
                    Math.pow(x - this.player.x, 2) + Math.pow(y - this.player.y, 2)
                );
            } while (distance < 100);

            const size = Math.random() * (this.player.size - 3) + 3;
            this.smallFish.push(new Fish(x, y, size, false));
        }
    }

    update() {
        if (!this.gameRunning || this.gamePaused) return;

        // Move player towards mouse
        const dx = this.mouseX - this.player.x;
        const dy = this.mouseY - this.player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 4;

        if (distance > 5) {
            this.player.vx = (dx / distance) * speed;
            this.player.vy = (dy / distance) * speed;
            this.player.x += this.player.vx;
            this.player.y += this.player.vy;
        }

        // Keep player in bounds
        this.player.x = Math.max(this.player.size, Math.min(this.canvas.width - this.player.size, this.player.x));
        this.player.y = Math.max(this.player.size, Math.min(this.canvas.height - this.player.size, this.player.y));

        // Update small fish
        this.smallFish.forEach(fish => fish.update(this.canvas));

        // Check collisions
        for (let i = this.smallFish.length - 1; i >= 0; i--) {
            if (this.player.canEat(this.smallFish[i])) {
                const eatenFish = this.smallFish.splice(i, 1)[0];
                this.eatFish(eatenFish);
            }
        }

        // Check if player is eaten
        for (let fish of this.smallFish) {
            if (fish.canEat(this.player)) {
                this.gameOver();
                return;
            }
        }

        // Spawn new fish when needed
        if (this.smallFish.length < 10 + this.level * 5) {
            this.spawnSmallFish(Math.floor(this.level * 1.5));
        }

        this.updateDisplay();
    }

    eatFish(fish) {
        this.score += Math.floor(fish.size);
        // Increase player size gradually
        this.player.size += fish.size * 0.1;

        // Level up
        if (this.score > 200 + (this.level - 1) * 300) {
            this.level++;
        }
    }

    updateDisplay() {
        document.getElementById('sizeDisplay').textContent = this.player.size.toFixed(1);
        document.getElementById('scoreDisplay').textContent = this.score;
        document.getElementById('levelDisplay').textContent = this.level;
    }

    gameOver() {
        this.gameRunning = false;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalSize').textContent = this.player.size.toFixed(1);
        document.getElementById('gameOver').classList.remove('hidden');
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(224, 247, 255, 0.3)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameRunning) {
            // Draw small fish
            this.smallFish.forEach(fish => fish.draw(this.ctx));

            // Draw player
            if (this.player) {
                this.player.draw(this.ctx);
            }

            // Draw level indicator
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.font = '14px Arial';
            this.ctx.fillText(`Level ${this.level}`, 10, 25);
        } else if (!this.gamePaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.font = 'bold 30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Click "Start Game" to begin!', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.textAlign = 'left';
        }
    }

    gameLoop() {
        if (!this.gameRunning && !this.gamePaused) return;

        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
});
