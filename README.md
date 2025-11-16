# 🐟 Big Fish Eat Small Fish

A fun and addictive browser-based game where you control a growing fish and compete to eat smaller fish while avoiding larger ones!

## 🎮 Play Now

Visit the live game: **[Play Big Fish Eat Small Fish](https://istilloweyou.github.io)**

## ✨ Features

- 🐠 **Smooth Gameplay**: Mouse-controlled fish that grows as you eat smaller fish
- 📈 **Progressive Difficulty**: Level system that increases challenge as you score points
- 🎨 **Colorful Graphics**: Vibrant animated fish with unique colors
- 🎯 **Score System**: Track your score, size, and level in real-time
- ⏸️ **Pause/Resume**: Take a break whenever you need
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **No Installation**: Play directly in your browser

## 🎯 How to Play

1. **Start the Game**: Click the "Start Game" button to begin
2. **Move Your Fish**: Move your mouse to control your golden fish
3. **Eat Smaller Fish**: Swim into smaller fish to eat them
4. **Grow Bigger**: Each fish you eat makes you bigger and increases your score
5. **Level Up**: Reach score milestones to advance levels and face new challenges
6. **Survive**: Avoid being eaten by larger fish!

## 🎮 Controls

| Action | Control |
|--------|---------|
| Move Fish | Move your mouse |
| Start Game | Click "Start Game" button |
| Pause | Click "Pause" button |
| Resume | Click "Resume" button |
| Restart | Click "Play Again" when game ends |

## 📊 Game Mechanics

### Eating Fish
- You can eat fish that are **30% smaller** than you (your size indicator must be visibly larger)
- Each fish you eat adds to your score and increases your size

### Scoring
- Score increases based on the size of the fish you eat
- Each level requires more points to reach the next level

### Levels
- Start at **Level 1** with 15 fish to hunt
- Each level spawns more enemy fish
- Enemy fish become more numerous as you progress

### Collision Detection
- **Get Eaten**: If a larger fish catches you, game over!
- **Eat Fish**: Touch smaller fish to consume them

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Canvas API for rendering
- **JavaScript**: Game logic and physics
- **CSS3**: Responsive styling and animations

### Game Architecture

The game is built with two main classes:

- **`Fish` Class**: Represents individual fish (player and enemies)
  - Handles movement and rendering
  - Manages collision detection
  - Generates random colors and movement patterns

- **`Game` Class**: Manages overall game state
  - Spawns and updates enemies
  - Handles player input (mouse tracking)
  - Manages score, level, and game over conditions
  - Renders game frames

### File Structure
```
istilloweyou.github.io/
├── index.html      # Main HTML page with game canvas
├── style.css       # Styling and responsive layout
├── game.js         # Game logic and physics
└── README.md       # This file
```

## 🚀 Installation & Deployment

### Local Testing
1. Clone the repository:
   ```bash
   git clone https://github.com/istilloweyou/istilloweyou.github.io.git
   cd istilloweyou.github.io
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js with http-server
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

### GitHub Pages Deployment
The game is automatically deployed to GitHub Pages. Simply push your changes:
```bash
git add .
git commit -m "Update game files"
git push origin main
```

Your game will be available at: `https://istilloweyou.github.io`

## 📈 Game Progression

| Level | Starting Fish | Difficulty |
|-------|--------------|------------|
| 1 | 15 | Easy - Small, slow enemies |
| 2 | 20 | Medium - More enemies |
| 3+ | 25+ | Hard - Many fast enemies |

## 🎨 Customization

You can easily customize the game by modifying these values in `game.js`:

- **Player starting size**: Change `new Fish(..., 15, true)` (default: 15)
- **Enemy colors**: Modify the `colors` array in `Fish.generateColor()`
- **Spawn rate**: Adjust `spawnSmallFish()` parameters
- **Difficulty scaling**: Modify level progression calculations
- **Canvas size**: Change dimensions in `setupCanvas()`

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

### Potential Enhancements
- Sound effects and background music
- Power-ups (speed boost, shield, etc.)
- High score leaderboard
- Multiple game modes
- Particle effects when eating fish
- Different fish species with unique behaviors

## 📝 License

This project is open source and available for personal and educational use.

## 🎮 Tips & Tricks

- **Early Game**: Focus on eating multiple small fish to grow steadily
- **Avoid Danger**: Keep track of larger fish positions
- **Use Pause**: Use the pause feature to plan your strategy
- **Speed**: Your fish moves at a fixed speed regardless of distance to cursor
- **Spawning**: New fish spawn far from you, giving you time to react

## 🐛 Known Issues

None at the moment! If you find any bugs, please report them.

## 🎉 Enjoy the Game!

Have fun playing Big Fish Eat Small Fish! Can you reach level 10? What's your high score?

---

**Made with ❤️ using HTML5 Canvas and JavaScript**
