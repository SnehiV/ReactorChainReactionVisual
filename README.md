Reactor Chain Reaction Visualization
------
[Live](https://snehiv.github.io/ReactorChainReactionVisual/)

###Instructions
This is a visualization of nuclear reactor that illustrates the chain
reaction of fission events that results from neutrons colliding with the
core. Reactors in operation keep the k Value at 1.

Set the k Value > 1 to see the the chain reaction get out of control or
k Value < 1 to see the neutrons die out. You can also increase the speed
of the simulation with the slider.

Select those values and press start.

The power level on the display is in Megawatts and represents thermal
power of the reactor if there were no safeguards.

###Technologies/languages
- HTML5 Canvas
- JavaScript
- CSS3
- Babel
- Webpack

###Background

This is a visualization of nuclear reactor that illustrates the chain reaction of fission events that results from neutrons colliding with the core. These collisions could result in a fission event the can produce 2-3 neutrons depending on the fuel. However the probability of a fission events occurring depends on a number of [complex factors](https://en.wikipedia.org/wiki/Six_factor_formula) that can be multiplied to form what is known as the effective multiplication constant (k). In an operating nuclear reactor the k value is kept very close to 1. Deviating from a k value of 1 can result in exponential decay of the neutron population if below 1 or and exponential increase in the neutron population if k is above 1.

###Methodology
In an operating reactor there are numerous systems in place to ensure that this does not happen. However in this visualization we will assume no safety precautions are in place because, why not?!?!? The point of the visualization is to illustrate the concept of nuclear fission chain reactions and how the neutron population can exponentially increase or decrease.

In this system the probability of a fission event is determined by the k value. The k value is a ratio of
neutrons created from fission in one generation to neutrons absorbed in the preceding generation.

![keff formula](/assets/effective-multiplication-factor.png?raw=true)

Meaning if there was a keff value of 1.1 and the population of a generation of neutrons is 1000. Then the next generation would have 1100 neutrons. This can be modeled by the differential equation
Nn = N0 * (k∞)^n with N0 being the number of neutrons in the initial generation of neutrons, n being the number of generations, Nn being the neutron count of the nth generation from the initial. In normal operation of a nuclear reactor the k value oscillates form slightly slower than 1 to slightly higher than 1. I assumed that there would be 2 product neutrons per fission event. So if the k value is set at 1, meaning there are about the same number of neutrons in each generation, the probability of a fission event would be 50% so that each generation of neutrons would have a count of around 100. The probability for varying k values was calculated with this method.

```javascript
calculateFissionProbability() {
  return ((this.simulation.initialNeutronCount * this.kValue) /
   (this.simulation.initialNeutronCount * 2));
}
```


In order to simplify the math of calculating the thermal power I assumed the operating thermal output of the reactor was 3000 Megawatts. This is about the average for most [Pressurized water reactors](https://en.wikipedia.org/wiki/Pressurized_water_reactor). Running the simulation with 100 initial neutrons with a k value of 1 resulted in about 5 fissions per second. Thus in this system each fission per second generates about 600 Megawatts of thermal output. In reality a fission event with Uranium-235 fuel results in 3.2 x 10^-11 joules. This means there are 9.375 x 10^19 fissions per second to generate 3000 MW of thermal output.

![steady-state](/assets/steady-state.png?raw=true)

There have been very few nuclear reactor meltdowns to ever occur and some of these were caused cooling system malfunctions, human error, or a combination of both. In a reactor, cooling system are in place the flow water through the reactor absorb heat and prevent the core from getting too hot and in some cases the coolant can absorb neutrons to help prevent uncontrolled chain reactions. This simulation keeps track of the average power level over time and I set an arbitrary value 10000 MW on average when the meltdown alert is triggered.

```javascript
checkMeltdown() {
  let total = 0;
  for (var i = 0; i < this.simulation.powerLevel.length; i++) {
    total += this.simulation.powerLevel[i];
  }
  let avgPowerLevel = total / this.simulation.powerLevel.length;
  if (avgPowerLevel > 10000) {
      this.alarm.currentTime=14;
      this.alarm.volume = 0.2;
      this.alarm.play();
      this.ctx.font = "bold 48px serif";
      this.ctx.fillStyle = 'red';
      this.ctx.fillText('MELTDOWN', 200, 400);
    this.stop();
  }
}
```

###To-dos/future features
This project has room to be much more of an accurate representation of a nuclear reactor.
The user could input all of the six factors of the six factor formula. The display could include
moderators, coolants, and the possibility of neutrons simple escaping the reactor.

I plan on making this into a game where the user would control some sort of moderator to prevent neutrons from reaching the core when the power level gets to high. It would get increasingly difficult as time went on. Perhaps the reactor could start at a very high power level and neutron count and the user would have to make sure as few fission events happen as they can so a meltdown does not occur.
