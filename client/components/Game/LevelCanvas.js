import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Matter from 'matter-js'

class LevelCanvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // maybe pull in game object names from conig to share w container so events can be created on the server via socket HOC
      boxA_BeingDragged: false,
      boxB_BeingDragged: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { latestCoordinates } = nextProps
    if(nextProps.latestCoordinates) {
      const { objectId, x, y } = latestCoordinates

      Matter.Body.setPosition(this[objectId], { x, y })
    }
  }

  componentDidMount() {
    const { Engine, Render, World, Bodies, Events, Runner } = Matter
    const engine = Engine.create()
    const world = engine.world;
    const canvas = this.levelCanvasRef;

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

    // Disable capturing scroll
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // Events
    Events.on(mouseConstraint, 'startdrag enddrag', (event) => {
      // id 1 === boxA
      // id 2 === boxB
      if(event.name === 'startdrag') {
        if(event.body.id === 1) {
          this.setState({ boxA_BeingDragged: true })
        }
        if(event.body.id === 2) {
          this.setState({ boxB_BeingDragged: true })
        }
      }

      if(event.name === 'enddrag') {
        console.log('stop drag');
        if(event.body.id === 1) {
          this.setState({ boxA_BeingDragged: false })
        }
        if(event.body.id === 2) {
          this.setState({ boxB_BeingDragged: false })
        }
      }
    })

    const runner = Runner.create()
    Runner.start(runner, engine)

    Events.on(runner, "afterUpdate", () => {
      this.handleMove()
      
    })

    // World.add(world, mouseConstraint)
    World.add(world, mouseConstraint)

    Engine.run(engine)
    Render.run(render)
  }

  handleMove = () => {
    // So each user should only be triggering one of these when they grab their own game object
    if(this.state.boxA_BeingDragged) {
      this.sendMove('boxA')
    }

    if(this.state.boxB_BeingDragged) {
      this.sendMove('boxB')
    }
    // Gravity isn't synced properly so stuff gets a bit weird but dont have to deal w it right now
  }

  sendMove = (objectId) => {
    this.props.socket.emit('latestCoordinates', { 
      objectId,
      x: this[objectId].position.x, 
      y: this[objectId].position.y
    })

    // TEST CODE
    this.props.socket.emit('latencyTest', Date.now(), (startTime) => {
      var latency = Date.now() - startTime;
      console.log(`Latency is ${latency}ms`);
    });
  }

  render() {
    return(
      <canvas ref={ (levelCanvasRef) => { this.levelCanvasRef = levelCanvasRef } }></canvas>
    )
  }
}

export default LevelCanvas