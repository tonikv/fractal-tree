/*
    Branch class
        
    This describes one "branch" of the tree. It has start and end position and thickness values.
    
    Functions:
    branchOut -> split this branch to new branch starting from this branches end position.
    drawBranch -> gives this branches values for drawing.

*/

class Branch {
    constructor(begin, end, thickness) {
        this.begin = begin; // Where branch starts
        this.end = end; // Where it ends
        this.thickness = thickness;
        this.finished = false; // Has branch already been branched out
    }

    // Function to make to make new branches after this branch. 
    // You can adjust rotation, length, thickness and variation of new branches.
    branchOut(rotate, length, width, angleVariation) {
        let randomVector = Vector.random2D(angleVariation);
        let direction = Vector.sub(this.end, this.begin);
        direction.rotate(rotate);
        direction.add(randomVector);
        direction.mult(length);
        let newEnd = Vector.add(this.end, direction);
        return new Branch(this.end, newEnd, width);
    }

    // Return values from this branch to draw it.
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