class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 25;
        this.speed = 2 + Math.random() * 2;
        this.shootCooldown = Math.floor(Math.random() * 120) + 60;
        this.maxShootCooldown = 120;
        this.health = 1;
    }

    update() {
        this.y += this.speed;
        
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff4444';
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x + this.width / 4, this.y + this.height * 0.3);
        ctx.lineTo(this.x + this.width * 0.75, this.y + this.height * 0.3);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = '#ff4444';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    canShoot() {
        return this.shootCooldown === 0;
    }

    shoot() {
        if (this.canShoot()) {
            this.shootCooldown = this.maxShootCooldown;
            return new Bullet(this.x + this.width / 2 - 2, this.y + this.height, 'down');
        }
        return null;
    }

    isOffScreen(canvasHeight) {
        return this.y > canvasHeight;
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}