import React, { Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import classNames from 'classnames'

import Tile from './Tile'

const tilesAcross = 15
const tilesDown = 15
const totalTiles = tilesAcross * tilesDown


// Some missing data
/* 
json.dumps( ('MIMICKED', ((3, 5), (3, 12)), ('M', 'I', '_', 'I', 'K', 'E', 'D'), 75) )
json.dumps( ('MIMICKED', ((3, 5), (3, 12)), ('_', 'I', 'M', 'I', 'K', 'E', 'D'), 75) )
json.dumps( ('MISLIKED', ((5, 6), (5, 13)), ('M', 'I', '_', 'I', 'K', 'E', 'D'), 67) )
json.dumps( ('MISLIKED', ((5, 6), (12, 6)), ('M', 'I', '_', 'I', 'K', 'E', 'D'), 55) )
*/


const mockWordData = [
  ["MIMICKED", [[3, 5], [3, 12]], ["M", "I", "_", "I", ":C:", "K", "E", "D"], 75],
  ["MIMICKED", [[3, 5], [3, 12]], ["_", "I", "M", "I", ":C:", "K", "E", "D"], 75],
  ["MISLIKED", [[5, 6], [5, 13]], ["M", "I", "_", ":L:", "I","K", "E", "D"], 67],
  ["MISLIKED", [[5, 6], [12, 6]], ["M", "I", "_", ":L:", "I", "K", "E", "D"], 55]
]

const initialState = {
  wordHoveredKey: null,
  startCell: null,
  endCell: null,
  cellsToHighlight: []
}

class ScrabbleBoard extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  getCellsToHighlightArray = (lowEnd, highEnd, horizontal)  => {
    let list = []
    if(horizontal) {
      for (let i = lowEnd; i <= highEnd; i++) {
        list.push(i)
      }
    } else {
      for (let i = lowEnd; i <= highEnd; i += 15) {
        list.push(i)
      }
    }
    return list
  }

  handleWordOver = (wordInfo, i) => {
    this.setState({ wordHoveredKey: i })

    const startOfWord = wordInfo[1][0]
    const endOfWord   = wordInfo[1][1]

    // Note: 
    // startOfWord[0] === x
    // startOfWord[1] === y

    const rowStart = (startOfWord[1] * 15) - 15  
    const startCell = rowStart + startOfWord[0] - 1

    const rowEnd = (endOfWord[1] * 15)  - 15
    const endCell = rowEnd + endOfWord[0] - 1

    const horizontal = startOfWord[1] === endOfWord[1] // if start of word Y is the same as end of word Y its horizontal

    const cellsToHighlight = this.getCellsToHighlightArray(startCell, endCell, horizontal)

    this.setState({ 
      startCell, 
      endCell,
      cellsToHighlight,
      wordChars: wordInfo[2]
    })
  }

  handleWordOut = () => {
    this.setState({ ...initialState })
  }

  showWordList = () => {
    const wordList = []

    mockWordData.forEach((wordInfo, i) => {
      const word = wordInfo[0]
      const points = wordInfo[3]

      wordList.push(
        <div
          className={ classNames({ 'hover-word': this.state.wordHoveredKey === i }) }
          key={ i }
          onMouseEnter={ this.handleWordOver.bind(this, wordInfo, i) }
          onMouseOut={ this.handleWordOut.bind(this, wordInfo, i) }
        >
          {`${ word } is worth ${points} points`}
        </div>
      )
    })

    return wordList
  }

  buildBoard = () => {
    const board = []

    for(let i = 0; i < totalTiles; i++) {
      board.push(
        <Tile
          key={ i }
          tileNumber={ i } 
          startCell={ this.state.startCell }
          endCell={ this.state.endCell }
          cellsToHighlight={ this.state.cellsToHighlight }
          wordChars={ this.state.wordChars }
        />
      )
    }

    return board
  }

  render() {
    const boardStyle = {
      width: '1600px'
    }

    return (
      <div>
        <div>
          Word List
          { this.showWordList()  }
        </div>
        <div style={ boardStyle }>
          { this.buildBoard() }
        </div>
      </div>
    )
  } 
}

export default ScrabbleBoard