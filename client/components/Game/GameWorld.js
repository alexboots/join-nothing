import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Matter from 'matter-js'


class GameWorld extends Component {
  constructor(props) {
    super(props)
    console.log("props", props);
    this.state = {
      boxAX: null,
      boxAY: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.newPositionDataReceived', nextProps.newPositionDataReceived)
    if(nextProps.newPositionDataReceived.positionX) {
      Matter.Body.setPosition(this.boxA, {
        x: nextProps.newPositionDataReceived.positionX, 
        y: nextProps.newPositionDataReceived.positionY 
      })
    }
  }

  componentDidMount() {
    const { Engine, Render, World, Bodies } = Matter
    const engine = Engine.create()
    const world = engine.world;
    const canvas = this.gameWorldRef;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
       wireframeBackground: '#1b1c1d'
      }
    })

                               // x, y, width, height
    this.boxA = Bodies.rectangle(400, 200, 80, 80)
    this.boxB = Bodies.rectangle(450, 50, 80, 80)
    this.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })



    World.add(world, [this.boxA, this.boxB, this.ground])

    var mouseConstraint = Matter.MouseConstraint.create(engine, {
      element: canvas,
      constraint: {
        render: {
          visible: true
        },
        stiffness:0.8
      }
    })

    // disable capturing scroll
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // World.add(world, mouseConstraint)
    World.add(world, mouseConstraint)
    
    
    // run the engine & renderer last
    Engine.run(engine)
    Render.run(render)


    this.setState({ boxAX: this.boxA.position.x });
    this.setState({ boxAY: this.boxA.position.y });

    // this.boxA.position.y = 300.9943323708297;
  }

  handleMouseUp = () => {
    if(this.state.boxAX !== this.boxA.position.x) {
      this.props.socket.emit('newBoxPosition', { 
        box: 'boxA',
        positionX: this.boxA.position.x, 
        positionY: this.boxA.position.y
      })
    }
  }

  render() {
    return(
      <canvas
        onMouseMove={ this.handleMouseUp }
        ref={ (gameWorldRef) => { this.gameWorldRef = gameWorldRef } }></canvas>
    )
  }
}

export default GameWorld