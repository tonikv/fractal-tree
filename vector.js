/*
    BASIC VECTOR CLASS 
*/

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static copy(v) {
        return new Vector(v.x, v.y);
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static random2D(mult) {
        let r = Math.sqrt(Math.random());
        let theta = Math.random() * 2 * Math.PI;
        let x = r * Math.cos(theta);
        let y = r * Math.sin(theta);
        let randomVector = new Vector(x,y);
        randomVector.mult(mult);
        return randomVector;
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static rotate(vector, degrees) {
        const radians = degrees * (Math.PI / 180);
        const rotatedX = vector.x * Math.cos(radians) - vector.y * Math.sin(radians);
        const rotatedY = vector.x * Math.sin(radians) + vector.y * Math.cos(radians);
        return new Vector(rotatedX, rotatedY);
    }

    static drawVector(v) {
        const drawObject = {
            x1 : v.x - v.x,
            y1 : v.y - v.y,
            x2 : v.x,
            y2 : v.y
        };
        return drawObject;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
    }

    rotate(degrees) {
        const radians = degrees * (Math.PI / 180);
        this.x = this.x * Math.cos(radians) - this.y * Math.sin(radians);
        this.y = this.x * Math.sin(radians) + this.y * Math.cos(radians);
    }

    getAngle() {
        const angle = Math.atan2(this.y, this.x); //Radians
        const degrees = 180 * angle / Math.PI;
        return (360 + Math.round(degrees)) % 360;
    }

    mult(scalar) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
    }

    div(scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
    } 

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    setter(x,y) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        let m = this.mag();
        if(m != 0) {
            this.div(m);
        }
    }

    limit(speed) {
        if(this.x > speed) {
            this.x = speed;
        }
        if(this.x < -speed) {
            this.x = -speed;
        }
        if(this.y > speed) {
            this.y = speed;
        }
        if(this.y < -speed) {
            this.y = -speed;
        }
    }

    random2D(min, max) {
        let x = Math.random() * (max - min) + min;
        let y = Math.random() * (max - min) + min;
        this.x = x;
        this.y = y;
    }
}