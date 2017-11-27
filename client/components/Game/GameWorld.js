import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Matter from 'matter-js'


class GameWorld extends Component {
  componentDidMount() {
    const { Engine, Render, World, Bodies } = Matter
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
        element: this.gameWorldRef,
        engine: engine,
        options: { wireframeBackground: '#1b1c1d' }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }

  render() {
    return(
      <div ref={ (gameWorldRef) => { this.gameWorldRef = gameWorldRef } }>
      </div>
    )
  }
}

export default GameWorld