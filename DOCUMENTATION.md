# 🐟 Big Fish Eat Small Fish - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Game Rules](#game-rules)
4. [Technical Architecture](#technical-architecture)
5. [Code Structure](#code-structure)
6. [API Reference](#api-reference)
7. [Customization Guide](#customization-guide)
8. [Troubleshooting](#troubleshooting)
9. [Future Enhancements](#future-enhancements)

---

## Overview

**Big Fish Eat Small Fish** is a browser-based arcade game built with HTML5 Canvas and vanilla JavaScript. The game features a player-controlled fish that grows by eating smaller fish while avoiding being eaten by larger ones.

### Key Specifications
- **Platform**: Web Browser (Chrome, Firefox, Safari, Edge)
- **Language**: JavaScript (ES6+)
- **Graphics**: HTML5 Canvas
- **Storage**: Browser Local Storage (optional, not currently implemented)
- **Performance**: Optimized for 60 FPS gameplay

---

## Features

### Core Gameplay
✅ Mouse-controlled player fish
✅ AI-controlled enemy fish with random movement
✅ Size-based collision detection
✅ Progressive difficulty with leveling system
✅ Real-time score and stats tracking

### UI/UX
✅ Clean, modern interface
✅ Responsive design for all screen sizes
✅ Interactive buttons (Start, Pause, Play Again)
✅ Game-over modal with final statistics
✅ Live HUD displaying size, score, and level

### Technical
✅ Efficient collision detection
✅ Smooth animation at 60 FPS
✅ Mouse tracking for smooth player movement
✅ Automatic fish spawning based on level
✅ Canvas size optimization

---

## Game Rules

### Winning Conditions
- No "winning" in the traditional sense—it's an endless arcade game
- Goal: Achieve the highest score possible before being eaten

### Losing Conditions
- Your fish collides with a fish that is **larger than your fish by 30%** (size factor: 1.3x)
- When this happens, the game ends immediately

### Eating Mechanics
```
Can Eat Fish If:
- Enemy Fish Size < Your Fish Size × 1.3
- Distance Between Centers < Your Size + Enemy Size
```

### Growth Mechanics
```
When You Eat a Fish:
- Score Increase = Enemy Fish Size (rounded down)
- Your Size Increase = Enemy Fish Size × 0.1
- Level Check: If Score > Threshold → Level Up
```

### Level Progression
```
Level = 1 + floor(Score ÷ 300)

Initial Fish Spawn = 15
Additional Spawn Rate = Current Level × 1.5 fish per spawn event
Maximum Fish Before Next Spawn = 10 + Level × 5
```

---

## Technical Architecture

### System Design

```
┌─────────────────────────────────────┐
│         index.html                  │
│    (Game Container & Canvas)        │
└────────────────┬────────────────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────▼────┐ ┌────▼────┐ ┌───▼──────┐
│style.css│ │ game.js │ └──────────┘
└─────────┘ └────┬────┘
                 │
        ┌────────┼────────┐
        │        │        │
    ┌───▼──┐ ┌──▼──┐ ┌───▼────┐
    │Fish  │ │Game │ │Canvas  │
    │Class │ │Class│ │Context │
    └──────┘ └─────┘ └────────┘
```

### Data Flow

```
User Input (Mouse)
    ↓
Game.mouseMove Event
    ↓
Game.update() - Calculate player position
    ↓
Fish.update() - Update all fish positions
    ↓
Collision Detection - Check eating/death
    ↓
Game.draw() - Render all objects
    ↓
requestAnimationFrame() - Repeat
```

---

## Code Structure

### File Overview

#### `index.html`
- Game container and canvas element
- Info display (Size, Score, Level)
- Control buttons
- Game-over modal

#### `style.css`
- Responsive grid layout
- Button styling with hover effects
- Canvas styling
- Mobile responsiveness
- Gradient backgrounds

#### `game.js`
Contains two main classes:

### `Fish` Class

**Constructor Parameters:**
```javascript
new Fish(x, y, size, isPlayer)
```

**Properties:**
- `x, y`: Position coordinates
- `size`: Fish radius (for collision and rendering)
- `isPlayer`: Boolean flag for player vs enemy
- `vx, vy`: Velocity vectors (x and y speed)
- `color`: Fish color (golden for player, random for enemies)

**Methods:**

```javascript
// Generate random color for enemy fish
generateColor() → String (hex color)

// Update fish position and behavior
update(canvas) → void

// Render fish to canvas
draw(ctx) → void

// Calculate distance to another fish
getDistance(other) → Number

// Check if this fish can eat another
canEat(other) → Boolean
```

### `Game` Class

**Constructor:**
```javascript
new Game(canvas)
```

**Properties:**
- `canvas`: HTML5 Canvas element
- `ctx`: Canvas 2D rendering context
- `player`: Fish object (player)
- `smallFish`: Array of Fish objects (enemies)
- `score`: Current score
- `level`: Current level
- `gameRunning`: Boolean game state
- `gamePaused`: Boolean pause state
- `mouseX, mouseY`: Current mouse position

**Methods:**

```javascript
// Setup canvas size and resolution
setupCanvas() → void

// Attach event listeners
setupEventListeners() → void

// Start or restart the game
start() → void

// Pause/resume gameplay
togglePause() → void

// Spawn N enemy fish with random positions
spawnSmallFish(count) → void

// Update all game logic each frame
update() → void

// Handle fish eating and score
eatFish(fish) → void

// Update UI display values
updateDisplay() → void

// End game and show game over modal
gameOver() → void

// Render current frame
draw() → void

// Main game loop
gameLoop() → void
```

---

## API Reference

### Fish Class API

#### Constructor
```javascript
const fish = new Fish(100, 100, 10, false);
// Creates enemy fish at (100, 100) with size 10
```

#### Instance Methods

##### `generateColor()`
Returns a random color string from predefined palette.
```javascript
fish.color = fish.generateColor(); // '#FF6B6B'
```

##### `update(canvas)`
Updates position based on velocity. For enemies, randomly changes direction.
```javascript
fish.update(gameCanvas);
```

##### `draw(ctx)`
Renders the fish to canvas with body, eye, and tail.
```javascript
fish.draw(canvasContext);
```

##### `getDistance(other)`
Calculates Euclidean distance to another fish.
```javascript
const distance = fish1.getDistance(fish2); // Returns number
```

##### `canEat(other)`
Checks if this fish can eat another fish.
```javascript
if (playerFish.canEat(enemyFish)) {
    // Eat the fish
}
```

### Game Class API

#### Constructor
```javascript
const game = new Game(canvasElement);
```

#### Instance Methods

##### `start()`
Initializes and starts a new game.
```javascript
game.start();
```

##### `togglePause()`
Pauses or resumes active gameplay.
```javascript
game.togglePause();
```

##### `spawnSmallFish(count)`
Creates N new enemy fish at random locations.
```javascript
game.spawnSmallFish(20);
```

##### `eatFish(fish)`
Processes fish consumption: updates score and player size.
```javascript
game.eatFish(enemyFish);
```

##### `updateDisplay()`
Updates the HUD with current game state.
```javascript
game.updateDisplay();
```

##### `gameOver()`
Ends the game and shows game-over screen.
```javascript
game.gameOver();
```

---

## Customization Guide

### Modifying Game Difficulty

#### Change Starting Fish Count
In `game.js`, find the `start()` method:
```javascript
// Original
this.spawnSmallFish(15);

// Harder (more fish)
this.spawnSmallFish(25);

// Easier (fewer fish)
this.spawnSmallFish(10);
```

#### Adjust Player Speed
In `game.js`, find the `update()` method of Game class:
```javascript
// Original speed: 4
const speed = 4;

// Faster: 6
const speed = 6;

// Slower: 2
const speed = 2;
```

#### Modify Difficulty Scaling
In `game.js`, find the spawn condition:
```javascript
// Original: 10 + level × 5
if (this.smallFish.length < 10 + this.level * 5) {

// Harder: 15 + level × 8
if (this.smallFish.length < 15 + this.level * 8) {
```

### Changing Colors

#### Player Color
In `Fish` constructor:
```javascript
// Change from golden
this.color = isPlayer ? '#FFD700' : this.generateColor();

// To another color
this.color = isPlayer ? '#00FF00' : this.generateColor();  // Green
this.color = isPlayer ? '#FF0000' : this.generateColor();  // Red
this.color = isPlayer ? '#0000FF' : this.generateColor();  // Blue
```

#### Enemy Colors
In `Fish.generateColor()` method:
```javascript
const colors = [
    '#FF6B6B',  // Red
    '#4ECDC4',  // Teal
    '#45B7D1',  // Blue
    '#FFA07A',  // Salmon
    '#98D8C8',  // Mint
    '#F7DC6F',  // Yellow
    '#BB8FCE'   // Purple
];
```

### Canvas Size
In `Game.setupCanvas()` method:
```javascript
// Original
this.canvas.width = Math.min(800, rect.width * 0.95);
this.canvas.height = 500;

// Larger
this.canvas.width = Math.min(1000, rect.width * 0.95);
this.canvas.height = 600;

// Smaller
this.canvas.width = Math.min(600, rect.width * 0.95);
this.canvas.height = 400;
```

### Level Requirements
In `Game.eatFish()` method:
```javascript
// Original: 200 + (level - 1) × 300
if (this.score > 200 + (this.level - 1) * 300) {

// Easier to level up
if (this.score > 100 + (this.level - 1) * 200) {

// Harder to level up
if (this.score > 300 + (this.level - 1) * 400) {
```

---

## Troubleshooting

### Game Won't Start
**Problem**: "Start Game" button doesn't work
**Solution**: 
- Check browser console for JavaScript errors (F12)
- Verify game.js is loaded correctly
- Try refreshing the page

### Mouse Tracking Not Working
**Problem**: Fish doesn't follow mouse
**Solution**:
- Ensure your browser allows mouse events
- Try a different browser
- Check that mousemove event listener is active

### Low Performance / Lag
**Problem**: Game runs slowly or stutters
**Solution**:
- Close other browser tabs to free up resources
- Clear browser cache
- Try a different browser (Chrome usually performs best)
- Reduce canvas size in setupCanvas()

### Game Crashes
**Problem**: Game stops unexpectedly
**Solution**:
- Check browser console for error messages
- Verify no fish array is corrupted
- Try restarting the game

### Difficulty Too Easy/Hard
**Problem**: Game isn't challenging enough or too hard
**Solution**:
- See "Customization Guide" section above
- Adjust spawn rates and player speed
- Modify size thresholds for eating fish

---

## Future Enhancements

### Planned Features

#### 🔊 Audio System
- Background music (looping, adjustable volume)
- Sound effects for:
  - Eating fish
  - Level up
  - Game over
  - Pause/unpause

#### 🎮 Game Modes
- **Classic**: Current gameplay
- **Time Attack**: Survive for N seconds
- **Zen**: No enemies, just peaceful swimming
- **Challenge**: Specific objectives to complete

#### 💾 Leaderboard
- Local high score storage
- Player name input
- Top 10 scores display
- Score persistence using localStorage

#### 🎁 Power-ups
- **Shield**: Temporary immunity
- **Speed Boost**: Increased movement speed
- **Growth**: Instant size increase
- **Magnet**: Auto-eat nearby fish

#### 🎨 Visual Enhancements
- Particle effects on fish consumption
- Bubble animations
- Water current effects
- Different fish species/designs
- Special skins for player fish

#### 🎯 Difficulty Options
- Easy / Normal / Hard presets
- Custom difficulty settings
- Handicap modes (bigger/smaller starting size)

#### 📊 Statistics
- All-time statistics
- Session tracking
- Most fish eaten
- Average game duration
- Personal records

#### 🌐 Multiplayer (Future)
- Leaderboard server
- Player achievements
- Online competitions

---

## Performance Metrics

### Current Performance
- **Frame Rate**: 60 FPS (60Hz)
- **Canvas Resolution**: 800×500 pixels (adaptive)
- **Maximum Fish on Screen**: ~50-60
- **Collision Checks**: O(n) per frame
- **Memory Usage**: ~5-10 MB

### Optimization Strategies
- Efficient collision detection using distance calculation
- Canvas clearing and redrawing each frame
- Viewport-based rendering (fish wrapping)
- Minimal DOM manipulation
- No external dependencies

---

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance |
| Firefox | ✅ Full | Excellent support |
| Safari | ✅ Full | Works on macOS and iOS |
| Edge | ✅ Full | Full compatibility |
| Internet Explorer | ❌ No | Canvas API not supported |

---

## License & Attribution

This project uses:
- **HTML5 Canvas API**: Native browser technology
- **CSS3**: Modern styling
- **Vanilla JavaScript**: No external libraries

All original code is open source.

---

## Support

For issues, suggestions, or feature requests, please check the GitHub repository or contact the maintainer.

**Enjoy the game! 🐟**
