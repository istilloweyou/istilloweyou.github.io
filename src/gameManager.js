// Game Manager - Handles game state and scoring
class GameManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.isGameOver = false;
        this.startTime = Date.now();
    }

    addScore(points) {
        this.score += points;
    }

    gameOver() {
        this.isGameOver = true;
    }

    update() {
        // Can add additional game logic here (level progression, difficulty scaling, etc.)
    }

    getElapsedTime() {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}
