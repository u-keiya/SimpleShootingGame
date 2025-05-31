class Bullet {
    constructor(x, y, direction = 'up') {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 10;
        this.speed = direction === 'up' ? -8 : 4;
        this.direction = direction;
        this.color = direction === 'up' ? '#00ff41' : '#ff4444';
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }

    isOffScreen(canvasHeight) {
        return this.y < 0 || this.y > canvasHeight;
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