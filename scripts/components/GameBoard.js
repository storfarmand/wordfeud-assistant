import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'gsap/Draggable';
import { countCombinations } from '../helpers.js';

import Hints from './Hints';

import * as GameActions from '../actions/GameActions';

export default class GamesBoard extends React.Component {

  constructor(props) {
    super(props);
    this.dictionary = props.dictionary;
    this.letters = new Array(15);
    for (let c=0; c <= 14; c++) {
      this.letters[c] = new Array(15);
      for (let r=0; r <= 14; r++) {
        this.letters[c][r] = '';
      }
    }
    this.words = [];
  }

  gotoGame(obj) {
    GameActions.getGame(obj);
  }

  getValue(boardLetter) {
    return this.props.letters.filter(letter => {
        return letter.letter === boardLetter;
    })[0].value;
  }

  getWordValue(word) {
    let totalValue = 0;
    [...word].forEach(c => totalValue += this.getValue(c));
    return totalValue;
  }

  getLetter(tiles, col, row) {
    const found = tiles.filter(tile => {
        return tile[0] === col && tile[1] === row;
    });
    return found.length > 0 ? {'letter': found[0][2], 'value': found[0][3] === true ? 0 : this.getValue(found[0][2]) } : {'letter': '', 'value': 0};
  }

  getTile(tiles, col, row) {
    const letterObj = this.getLetter(tiles, col, row);
    this.letters[col][row] = letterObj.letter;
    const value = letterObj.value;
    const lastPlayed = this.props.game.last_move.move_type === 'move' ? this.props.game.last_move.move.filter(move => {
      return move[0] === col && move[1] === row
    }) : [];
    return <span class={lastPlayed.length > 0 ? 'last-played' : ''}>{this.letters[col][row]}{value > 0 ? <sub>{value}</sub> : ''}</span>
  }

  sweepBoard(tiles) {

    let words = [];
    for (let c = 0; c < 15; c++) {
      let word = '';
      for (let r = 0; r < 15; r++) {
        const found = tiles.filter(tile => {
          return c === tile[0] && r === tile[1];
        });
        if (found.length === 0) {
          if (word.length > 1) {
            words.push(word);
          }
          word = '';
          continue;
        }
        word += found[0][2];
      }
    }
    for (let r = 0; r < 15; r++) {
      let word = '';
      for (let c = 0; c < 15; c++) {
        const found = tiles.filter(tile => {
          return c === tile[0] && r === tile[1];
        });
        if (found.length === 0) {
          if (word.length > 1) {
            words.push(word);
          }
          word = '';
          continue;
        }
        word += found[0][2];
      }
    }
    return words;
  }

  getAnchors(tiles) {

    let anchors = [];
    for (let c = 0; c < 15; c++) {
      for (let r = 0; r < 15; r++) {
        const found = tiles.filter(tile => {
          return ((( c === tile[0] && (r + 1) === tile[1] )  ||
                   ( c === tile[0] && (r - 1) === tile[1] )) &&
                  tiles.filter(tileX => {
                    return c === tileX[0] && r === tileX[1]
                  }).length === 0)
        });
        found.length > 0 && anchors.push([c,r]);
      }
    }
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        const found = tiles.filter(tile => {
          return ((( (c + 1) === tile[0] && r === tile[1] ) ||
                   ( (c - 1) === tile[0] && r === tile[1] )) &&
                  tiles.filter(tileX => {
                    return c === tileX[0] && r === tileX[1]
                  }).length === 0)
        });
        found.length > 0 && (' ' + anchors.join(' | ') + ' ').indexOf(' ' + c + ',' + r + ' ') < 0 && anchors.push([c,r]);
      }
    }
    return anchors;

  }

  findWords(rack, anchors, board, tiles) {
    let foundWords = [];
    anchors.forEach(anchor => {
      const anchorCol = anchor[0];
      const anchorRow = anchor[1];
      const that = this;
        rack.forEach(rackTile => {
          const newTiles = tiles.concat([[anchorCol, anchorRow, rackTile, false]]);
          const updatedWords = this.sweepBoard(newTiles);
          if (updatedWords.filter(word => {
            return this.dictionary.indexOf(word.toLowerCase()) === -1;
          }).length > 0) return;
          const newWords = updatedWords.filter(word => {
            return this.words.indexOf(word) === -1;
          })
          if (newWords.length) {
            console.log({col: anchorCol, row: anchorRow, newWords: newWords})
            newWords.forEach(word => {
              foundWords.push(word);
            })
          }
        });
    });
    return foundWords;
  }

  getLastMove() {
      return (
        this.props.game.last_move.move_type === 'move' ? this.props.game.last_move.points :
        this.props.game.last_move.move_type === 'swap' ? 'Swapped ' + this.props.game.last_move.tile_count + ' tiles' :
        this.props.game.last_move.move_type === 'pass' ? 'Passed' :
        'Unknown'
      )
  }

  render() {
    console.log('game tiles', this.props.game.tiles);
    const tiles = this.props.board
      .map((col, rIdx) => {
        return col.map((tile, cIdx) => {
          const tileMarkup = this.getTile(this.props.game.tiles, cIdx, rIdx);
          return <li
            class={[
              "tile",
              "type" + tile
            ].join(' ')}
            key={cIdx * rIdx}
          >
            <p href="">
              {tile === 1 ? 'DL' :
               tile === 2 ? 'TL' :
               tile === 3 ? 'DW' :
               tile === 4 ? 'TW' :
               ''}
               {tileMarkup}
            </p>
          </li>;
        });
      });
    const rack = this.props.game.players.filter(player => {
      return player.rack ? true : false;
    })[0].rack;
    console.log('rack', rack);
    const wordsInRack = countCombinations(rack).filter(word => {
      return this.dictionary.indexOf(word.toLowerCase()) >= 0;
    });
    const wordsInRackWithPoints = wordsInRack.map(word => {
      return {
        word,
        points: this.getWordValue(word)
      }
    }).sort((a, b) => a.points < b.points ? 1 : -1);
    console.log('words in rack', wordsInRackWithPoints);
    const myRack = rack.map((letter, lIdx) => {
        const value = this.getValue(letter).value;
        return <li
          class={[
            "tile",
          ].join(' ')}
          key={lIdx}
        >
          <p>
            <span>{letter}<sub>{value || ''}</sub></span>
          </p>
        </li>;
    });
    this.words = this.sweepBoard(this.props.game.tiles);
    console.log('words', this.words);
    this.missingWords = this.words.filter(word => {
      return this.props.dictionary.indexOf(word.toLowerCase()) === -1;
    });
    console.log('missing words', this.missingWords);
    this.anchors = this.getAnchors(this.props.game.tiles);
    console.log('anchors', this.anchors);
    const newWords = this.findWords(rack, this.anchors, this.props.board, this.props.game.tiles);
    console.log('newWords', newWords);
    return (
      <div class="game-board">
        <ul class="score">
          <li>{this.props.game.players[0].username} ({this.props.game.players[0].score})</li>
          <li>{this.props.game.players[1].username} ({this.props.game.players[1].score})</li>
        </ul>
        <ul class="score-last">
          <li>{this.props.game.current_player === 1 && this.getLastMove()}</li>
          <li>{this.props.game.current_player === 0 && this.getLastMove()}</li>
        </ul>
        <ul class="tiles">
          {tiles}
        </ul>
        <p class="tiles-remaining">Tiles remaining: {this.props.game.bag_count}</p>
        <div
          class="rack"
          ref={rack => this.rack = rack}
        >
          <ul>
            {myRack}
          </ul>
        </div>
        <Hints
          words={newWords}
        />
      </div>
    );
  }
}
