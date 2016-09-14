

const Util = {

  randomPos(x, y){
    return [Math.random() * x, Math.random() * y];
  },

  randomVelocity (speed) {
    let deg = 2 * Math.PI * Math.random();
    return [Math.sin(deg) * speed, Math.cos(deg) * speed];
  },

  randomWrapVelocity(side, speed) {
    let deg = 2 * Math.PI * Math.random();
    if (side === 0) {
      return [Math.sin(deg) * speed, -(Math.cos(deg)) * speed];
    } else if (side === 1) {
      return [-(Math.sin(deg)) * speed, Math.cos(deg) * speed];
    } else if (side === 2) {
      return [Math.abs(Math.sin(deg)) * speed, Math.cos(deg) * speed];
    } else if (side === 3) {
      return [Math.abs(Math.sin(deg)) * speed,
        Math.cos(deg) * speed];
    }
  },

  dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  }
};

export default Util;
