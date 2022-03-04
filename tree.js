class Tree {
    constructor() {
        this.branches = [];
    }

    addBranch(branch) {
        this.branches.push(branch);
    }

    drawTree(ctx) {
        for (let i = 0; i < this.branches.length; i++) {
            ctx.moveTo(this.branches[i].begin.x, this.branches[i].begin.y);
            ctx.lineTo(this.branches[i].end.x, this.branches[i].end.y);
            ctx.stroke();
        }
    }

    getBranches() {
        return this.branches;
    }
}