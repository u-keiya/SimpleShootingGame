class CollisionDetector {
    static checkCollision(obj1, obj2) {
        const bounds1 = obj1.getBounds();
        const bounds2 = obj2.getBounds();
        
        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }

    static checkBulletEnemyCollisions(bullets, enemies) {
        const collisions = [];
        
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            if (bullet.direction !== 'up') continue;
            
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                
                if (this.checkCollision(bullet, enemy)) {
                    collisions.push({
                        bulletIndex: i,
                        enemyIndex: j,
                        bullet: bullet,
                        enemy: enemy
                    });
                    break;
                }
            }
        }
        
        return collisions;
    }

    static checkPlayerEnemyCollisions(player, enemies) {
        for (let i = 0; i < enemies.length; i++) {
            if (this.checkCollision(player, enemies[i])) {
                return i;
            }
        }
        return -1;
    }

    static checkPlayerBulletCollisions(player, bullets) {
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            if (bullet.direction === 'down' && this.checkCollision(player, bullet)) {
                return i;
            }
        }
        return -1;
    }
}