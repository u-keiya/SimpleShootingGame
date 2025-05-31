# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A simple space shooter game built with HTML5 Canvas and vanilla JavaScript, designed for deployment to GitHub Pages.

## Technology Stack

- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+) for game logic
- CSS3 for styling and UI
- No external dependencies (GitHub Pages compatible)

## Project Structure

```
/
├── index.html          # Main game page
├── css/style.css       # Game styling and UI
└── js/
    ├── game.js         # Core game engine and main loop
    ├── player.js       # Player ship class and controls
    ├── bullet.js       # Bullet/projectile mechanics
    ├── enemy.js        # Enemy ships and AI
    └── collision.js    # Collision detection utilities
```

## Game Architecture

- **Player**: Triangle ship controlled with WASD/Arrow keys, shoots with Spacebar
- **Enemies**: Red ships spawn from top, move downward, occasionally shoot
- **Bullets**: Green (player) and red (enemy) projectiles
- **Collision System**: Handles bullet-enemy, player-enemy, and player-bullet interactions
- **Scoring**: 10 points per enemy destroyed
- **Lives System**: Player starts with 3 lives

## Development

To test locally, simply open `index.html` in a web browser. No build process required.

## GitHub Pages Deployment

The game is ready for direct deployment to GitHub Pages - just push to a repository and enable Pages on the main branch.