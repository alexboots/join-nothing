import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Matter from 'matter-js'


class GameWorld extends Component {
  componentDidMount() {
    const { Engine, Render, World, Bodies } = Matter
    const engine = Engine.create()
    const world = engine.world;

    const render = Render.create({
      canvas: this.gameWorldRef,
      engine: engine,
      options: { wireframeBackground: '#1b1c1d' }
    })

                               // x, y, width, height
    var boxA = Bodies.rectangle(400, 200, 80, 80)
    var boxB = Bodies.rectangle(450, 50, 80, 80)
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

    World.add(world, [boxA, boxB, ground])


    var mouseConstraint = Matter.MouseConstraint.create(engine, {
      element: this.gameWorldRef,
      constraint: {
        render: {
          visible: true
        },
        stiffness:0.8
      }
    })


    // // disable capturing scroll
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    World.add(world, mouseConstraint)
    
    
    // run the engine & renderer last
    Engine.run(engine)
    Render.run(render)
  }

  render() {
    return(<canvas ref={ (gameWorldRef) => { this.gameWorldRef = gameWorldRef } }></canvas>)
  }
}

export default GameWorld