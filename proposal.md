Nuclear Reactor Chain Reaction Visualization
--------------------------------------------
###Background

A nuclear reactor core is able to generate energy through a chain reaction
of fission events that occur when neutrons collide with the fuel located in
the core of the reactor. In order to maintain a steady level of energy generation,
the neutron population must stay relatively the same from one generation of neutrons,
to the next. A generation means that at any given time there are certain number of, N.
All of those neutrons can escape the reactor vessel, collide with moderators, other particles,
or fuel and not cause a fission reaction, or collide with the fuel and cause a fission reaction
that results in some fission products that include heat and 2-3 neutrons on average depending on the
fuel. The ratio of neutrons from once generation to the next is known as the effective multiplication factor, k. If k = 1, the neutron population is steady from one generation to the next thus resulting
in a steady generation of energy. If k > 1, there is a exponential growth in neutrons from one generation
to the next modeled by the equation Nn=N0 (k∞)^n with N0 being the initial amount of neutrons and
n being how many generations since the initial. If k < 1, the neutron population will experience exponential decay. The k value is determined by a number of factors including the dimensions of the reactor,
the core, the type of fuel, types of moderator, etc.

This simulation will visualize the effect of the k value on neutron population from generation to generation. It will assume that neutrons do not escape the reactor for simplicity's sake.


###Functionality and MVP

This simulation will allow the user to toggle the the k value with a number input and watch
as the neutrons exponentially grow or decay. Each generation of neutrons will be a different
color so the user can see the change from one generation to the next. There will be a core in
the center of the view and when neutrons collide with it based on the probability that is determined
by the k value, either a fission event will occur producing two or three new neutron objects of a different color or nothing will happen which represents, absorption by moderator, fuel, or other particles without a fission event.

There could also be a speed slider that would toggle the speed of the simulation. I plan on making the visualization very colorful.

There will be an upper limit on the k value of 1.5 or 2 because then multiplication would happen too fast. The power level will be displayed every second and I will keep track of the average power level behind the scenes. If the average power level reached a certain upper limit the simulation will end in
a meltdown. In normal reactor operation, if the k value is over 1 for too long it will result in a meltdown. There could be an animation indicating a meltdown happening. If the user chooses a k value < 1 then the neutrons will eventually deplete to 0.

This project will have a modal/section that explains the concept of criticality and fission chain reactions. **** too much for the modal. I put it in the README ****

###Wireframe

The app will have a main view where the simulation occurs that represents the reactor. The title
will be above and toggle sliders will be on the top right. Either through a modal or section at the bottom will explain the idea and how the app works. Links to my info will be below the title.

[wireframe](JSproject_wireframe.png)

###Architecture and Technologies

This project will be implemented using the following technologies:

  - Vanilla Javascript for overall structure and logic
  - `HTML5 canvas` for DOM manipulation and rendering
  - `Easel.js` and  possibly `Sound.js` for making the visualization look nicer and add   sounds effects
  - `Webpack` to bundle and serve up the various scripts

  This project will similar file structure to the Asteroids game we did in class. There will be a `neutron.js` file that will handle the movement, shape, and color of the neutrons. There may need to be a `core.js` file that will handle collisions with the core and the logic of a fission event producing more neutrons based on the fission probability set by the chosen k value., changing the color of the new neutrons produced, and a flash for if a fission event occurs. A `simulation.js` file will bring these elements together and run the overall logic of applying the setting of k value and speed and start and stop.


###Implementation and Timeline.

**Day 1:** Setup all necessary Node modules, including getting webpack up and running installed. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 3 scripts outlined above. Learn what I need to know about using canvas . Goals for the day:

- Get a green bundle with `webpack`
- Learn how to use `Easel.js`/ `HTML5 canvas` to render neutrons and core and have the neutrons move around

**Day 2:** Render the simulation view and and build out the neutron class. Also build the core class.
Goals for the day:

- Have neutrons floating around the view and the core at the center of the view.

**Day 3:** Develop the logic for neutrons colliding with the core. Create the slider for the k value.

- Neutrons that collide with the core result in fission events that produce new neutrons of a different color.

- Add the speed slider to control the velocity of the neutrons.

**Day 4:** Develop logic for ending the simulation. Add animation for the flash of the color to indicate a fission event. Develop the animation for a meltdown simulation.

- Finish and polish the entire simulation with all the animations completed.

### Bonus features:

- Add a neutron count ticker on the side for each generation of neutrons.
- Add sounds where appropriate.
- Add more controls that could toggle the size of the core, type of fuel, to make the simulation more scientifically accurate.
