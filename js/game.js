class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(180, 650);
        this.bullets = [];
        this.enemies = [];
        this.keys = {};
        this.score = 0;
        this.lives = 3;
        this.gameRunning = true;
        this.enemySpawnTimer = 0;
        this.enemySpawnRate = 120;
        this.touchControls = {
            moveTouch: null,
            shootTouch: null,
            moveX: 0,
            moveY: 0
        };
        
        this.setupEventListeners();
        this.setupTouchControls();
        this.gameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                const bullet = this.player.shoot();
                if (bullet) {
                    this.bullets.push(bullet);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    setupTouchControls() {
        const moveArea = document.getElementById('moveArea');
        const shootArea = document.getElementById('shootArea');

        moveArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.touchControls.moveTouch = touch.identifier;
            const rect = moveArea.getBoundingClientRect();
            this.touchControls.moveX = touch.clientX - rect.left;
            this.touchControls.moveY = touch.clientY - rect.top;
        });

        moveArea.addEventListener('touchmove', (e) => {
            e.preventDefault();
            for (let touch of e.touches) {
                if (touch.identifier === this.touchControls.moveTouch) {
                    const rect = moveArea.getBoundingClientRect();
                    this.touchControls.moveX = touch.clientX - rect.left;
                    this.touchControls.moveY = touch.clientY - rect.top;
                    break;
                }
            }
        });

        moveArea.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchControls.moveTouch = null;
            this.touchControls.moveX = 0;
            this.touchControls.moveY = 0;
        });

        shootArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const bullet = this.player.shoot();
            if (bullet) {
                this.bullets.push(bullet);
            }
        });

        document.addEventListener('touchstart', (e) => {
            if (e.target.id !== 'moveArea' && e.target.id !== 'shootArea') {
                e.preventDefault();
            }
        });
    }

    spawnEnemy() {
        const x = Math.random() * (this.canvas.width - 30);
        this.enemies.push(new Enemy(x, -25));
    }

    update() {
        if (!this.gameRunning) return;

        this.player.update(this.keys, this.canvas.width, this.canvas.height, this.touchControls);

        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter(bullet => !bullet.isOffScreen(this.canvas.height));

        this.enemies.forEach(enemy => enemy.update());
        this.enemies = this.enemies.filter(enemy => !enemy.isOffScreen(this.canvas.height));

        this.enemySpawnTimer++;
        if (this.enemySpawnTimer >= this.enemySpawnRate) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
            
            if (this.enemySpawnRate > 30) {
                this.enemySpawnRate -= 0.5;
            }
        }

        for (let enemy of this.enemies) {
            const enemyBullet = enemy.shoot();
            if (enemyBullet) {
                this.bullets.push(enemyBullet);
            }
        }

        this.checkCollisions();
        this.updateUI();
    }

    checkCollisions() {
        const bulletEnemyCollisions = CollisionDetector.checkBulletEnemyCollisions(this.bullets, this.enemies);
        
        bulletEnemyCollisions.forEach(collision => {
            this.bullets.splice(collision.bulletIndex, 1);
            this.enemies.splice(collision.enemyIndex, 1);
            this.score += 10;
        });

        const playerEnemyCollision = CollisionDetector.checkPlayerEnemyCollisions(this.player, this.enemies);
        if (playerEnemyCollision !== -1) {
            this.enemies.splice(playerEnemyCollision, 1);
            this.lives--;
            this.checkGameOver();
        }

        const playerBulletCollision = CollisionDetector.checkPlayerBulletCollisions(this.player, this.bullets);
        if (playerBulletCollision !== -1) {
            this.bullets.splice(playerBulletCollision, 1);
            this.lives--;
            this.checkGameOver();
        }
    }

    checkGameOver() {
        if (this.lives <= 0) {
            this.gameRunning = false;
            document.getElementById('finalScore').textContent = this.score;
            document.getElementById('gameOver').style.display = 'block';
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawStars();

        this.player.draw(this.ctx);
        
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }

    drawStars() {
        this.ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 2;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    restart() {
        this.player = new Player(180, 650);
        this.bullets = [];
        this.enemies = [];
        this.score = 0;
        this.lives = 3;
        this.gameRunning = true;
        this.enemySpawnTimer = 0;
        this.enemySpawnRate = 120;
        document.getElementById('gameOver').style.display = 'none';
        this.updateUI();
    }
}

let game;

window.onload = function() {
    game = new Game();
};

function restartGame() {
    game.restart();
}