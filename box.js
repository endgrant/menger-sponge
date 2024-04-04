// Box class


class Box {
  constructor(size, pos) {
    this.size = size;
    this.pos = pos;
    this.subdivisions = [];
  }
  
  
  // Draws the box object for a single frame
  process() {
    if (this.subdivisions.length > 0) {
      for (let i = 0; i < this.subdivisions.length; i++) {
        this.subdivisions[i].process();
      }
    } else {
      translate(this.pos.x, this.pos.y, this.pos.z);
      box(this.size);
      translate(-this.pos.x, -this.pos.y, -this.pos.z);
    }
  }
  
  
  // Subdivides this box into a fractal of small boxes
  subdivide() {
    if (this.subdivisions.length > 0) {
      // Subdivide subdivisions
      for (let i = 0; i < this.subdivisions.length; i++) {
        this.subdivisions[i].subdivide();
      }
    } else {
      // Subdivide this
      let thirdSize = this.size / 3;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            let pos = createVector(x, y, z);
            if (pos.mag() <= 1) {
              // Pos is along a primary axis
              continue;
            } else {
              this.subdivisions.push(
                new Box(thirdSize, pos.mult(thirdSize).add(this.pos)));
            }
          }
        }
      }
    }
  }
}