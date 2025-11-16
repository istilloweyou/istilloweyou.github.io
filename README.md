# Feeding Frenzy - Phaser Game

A Feeding Frenzy-like game built with Phaser.io and deployed on GitHub Pages.

## Features

- **Player Movement**: Control your fish with arrow keys or mouse
- **Eating Mechanics**: Eat smaller fish to grow and gain points
- **Enemy AI**: Dodge larger fish or they'll eat you!
- **Progressive Difficulty**: More enemies spawn as you play
- **Score System**: Points for eating food and enemies
- **Responsive Design**: Plays on desktop and mobile

## Gameplay

1. Start the game and move your fish around
2. Eat orange food pellets to grow
3. Avoid red enemy fish that are larger than you
4. Eat red enemy fish that are smaller than you for bonus points
5. Try to get the highest score!

## How to Play

- **Desktop**: Use Arrow Keys to move or move your mouse to direct the fish
- **Mobile**: Tap and drag to move your fish around

## Installation & Deployment

This game is deployed directly on GitHub Pages. Simply push to your GitHub Pages repository:

```bash
git add .
git commit -m "Add Feeding Frenzy game"
git push origin main
```

Then visit: `https://your-username.github.io`

## Technologies Used

- [Phaser 3](https://phaser.io/) - HTML5 Game Framework
- Vanilla JavaScript
- GitHub Pages - Hosting

## Game Structure

```
src/
├── config.js           # Game configuration
├── gameManager.js      # Game state management
├── scenes/
│   ├── bootScene.js    # Asset initialization
│   ├── menuScene.js    # Main menu
│   └── gameScene.js    # Main gameplay
├── entities/
│   ├── player.js       # Player fish class
│   ├── food.js         # Food class
│   └── enemy.js        # Enemy fish class
└── ui/
    └── hud.js          # HUD display

index.html             # Main HTML file
style.css              # Styling
main.js                # Entry point
```

## Customization

You can easily customize:

- **Game size**: Edit `width` and `height` in `src/config.js`
- **Colors**: Modify colors in scene and entity files
- **Spawn rates**: Adjust delay times in `gameScene.js`
- **Difficulty**: Change enemy speed and spawn count
- **Graphics**: Replace the generated graphics with custom sprites

## License

Free to use and modify!

## Credits

Made with Phaser.io - Deployed on GitHub Pages
