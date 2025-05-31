class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 30;
        this.speed = 5;
        this.shootCooldown = 0;
        this.maxShootCooldown = 10;
    }

    update(keys, canvasWidth, canvasHeight) {
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        if ((keys['ArrowLeft'] || keys['a'] || keys['A']) && this.x > 0) {
            this.x -= this.speed;
        }
        if ((keys['ArrowRight'] || keys['d'] || keys['D']) && this.x < canvasWidth - this.width) {
            this.x += this.speed;
        }
        if ((keys['ArrowUp'] || keys['w'] || keys['W']) && this.y > 0) {
            this.y -= this.speed;
        }
        if ((keys['ArrowDown'] || keys['s'] || keys['S']) && this.y < canvasHeight - this.height) {
            this.y += this.speed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#00ff41';
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width / 4, this.y + this.height * 0.7);
        ctx.lineTo(this.x + this.width * 0.75, this.y + this.height * 0.7);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    canShoot() {
        return this.shootCooldown === 0;
    }

    shoot() {
        if (this.canShoot()) {
            this.shootCooldown = this.maxShootCooldown;
            return new Bullet(this.x + this.width / 2 - 2, this.y, 'up');
        }
        return null;
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