class Branch{
    constructor(begin, end, thickness) {
        this.begin = begin;
        this.end = end;
        this.thickness = thickness;
        this.finished = false;
    }

    branchOut(rotate, length, width, angleVariation) {
        let randomVector = Vector.random2D(angleVariation);
        let direction = Vector.sub(this.end, this.begin);
        direction.rotate(rotate);
        direction.add(randomVector);
        direction.mult(length);
        let newEnd = Vector.add(this.end, direction);
        return new Branch(this.end, newEnd, width);
    }

    drawBranch() {
        const object = {
            startX: this.begin.x,
            startY: this.begin.y,
            endX: this.end.x,
            endY: this.end.y,
            thickness: this.thickness
        }
        return object;
    }
}