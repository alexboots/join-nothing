import React, { Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'

import classNames from 'classnames'

class Tile extends Component {

  shouldComponentUpdate(nextProps) {
    // So we don't re-render every single cell on hover over
    const oldTile = this.shouldUpdateCell(this.props)
    const newTile = this.shouldUpdateCell(nextProps)

    if(oldTile || newTile) {
      return true
    }

    return false
  }

  shouldUpdateCell = (props) => {
    const { cellsToHighlight, tileNumber } = props

    return cellsToHighlight.includes(tileNumber)
  }

  render() {
    const { 
      tileNumber,
      wordChars,
      cellsToHighlight
    } = this.props

    const tileOutter = {
      border: '1px solid #333',
      borderRadius: '1px',      
      display: 'inline',
    }

    const tileInner = {
      margin: '3px',
      color: '#333',
      backgroundColor: 'white',
      height: '30px',
      width: '30px',
      display: 'inline-block'
    }

    const highlightCell = this.shouldUpdateCell(this.props)
    let char = ' '
    let indexOfChar = null

    if(highlightCell) {
      indexOfChar = cellsToHighlight.indexOf(tileNumber)

      tileInner.backgroundColor = 'black'
      tileInner.color = 'white'

      char =  wordChars[indexOfChar]
    } else {
      char = tileNumber
    } 

    return (
      <div style={ tileOutter }>
        <div style={ tileInner }>
          { char }
        </div> 
        { (tileNumber + 1) % 15 === 0 ? <br /> : null } 
      </div>
    )
  } 
}

export default Tile