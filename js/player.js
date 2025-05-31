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

    update(keys, canvasWidth, canvasHeight, touchControls = null) {
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        // Keyboard controls
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

        // Touch controls
        if (touchControls && touchControls.moveTouch !== null) {
            const moveAreaWidth = window.innerWidth * 0.5;
            const moveAreaHeight = 120;
            
            // Convert touch position to movement direction
            const centerX = moveAreaWidth / 2;
            const centerY = moveAreaHeight / 2;
            
            const deltaX = touchControls.moveX - centerX;
            const deltaY = touchControls.moveY - centerY;
            
            // Apply movement based on touch position relative to center
            if (Math.abs(deltaX) > 20) {
                const moveX = (deltaX / centerX) * this.speed;
                this.x += moveX;
                this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
            }
            
            if (Math.abs(deltaY) > 20) {
                const moveY = (deltaY / centerY) * this.speed;
                this.y += moveY;
                this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));
            }
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