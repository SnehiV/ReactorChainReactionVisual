import Simulation from './simulation';

class SimulationView {
  constructor(ctx, coreImage){
    this.ctx = ctx;
    this.coreImage = coreImage;
    this.active = true;
    this.meltdown = false;
    this.alarm = new Audio("nuclear_alarm.mp3");
  }

  start() {
    const ctx = this.ctx;
    this.simulation = new Simulation(ctx);
    this.active = true;
    this.lastTime = 0;
    this.simulation.core.getKValue();
    this.simulation.getSpeed();
    this.simulation.populateNeutrons();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.simulation.step(timeDelta);
    this.simulation.draw(this.ctx, this.coreImage);
    this.lastTime = time;
    this.checkMeltdown();
    if (this.active) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  stop() {
    this.active = false;
    let canvas = document.getElementsByTagName("canvas")[0];
    window.setTimeout(() => (this.ctx.clearRect(0, 0, canvas.width, canvas.height)), 7000);
    if (this.meltdown) {
      this.alarm.currentTime=14;
      this.alarm.play();
      this.ctx.font = "48px serif";
      this.ctx.fillStyle = 'red';
      this.ctx.fillText('MELTDOWN', 300, 300);
    }
    document.getElementById("kvalue").disabled = false;
    document.getElementById("speed").disabled = false;
    if (this.simulation.neutrons) {
      this.simulation.neutrons = [];
    }
    this.meltdown = false;
  }

  meltdown(){
    new Audio("nuclear_alarm.mp3").play();
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('MELTDOWN', 300, 300);
  }

  checkMeltdown() {
    let total = 0;
    for (var i = 0; i < this.simulation.powerLevel.length; i++) {
      total += this.simulation.powerLevel[i];
    }
    let avgPowerLevel = total / this.simulation.powerLevel.length;
    if (avgPowerLevel > 10000) {
      this.meltdown = true;
      this.stop();
    }
  }
}

export default SimulationView;
