import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'gsap/Draggable';

import Hints from './Hints';

import * as GameActions from '../actions/GameActions';

export default class GamesBoard extends React.Component {

  constructor() {
    super();

    this.letters = new Array(15);
    for (let c=0; c <= 14; c++) {
      this.letters[c] = new Array(15);
      for (let r=0; r <= 14; r++) {
        this.letters[c][r] = '';
      }
    }
    this.words = [];
  }

  componentDidMount() {
    const rackTiles = ReactDOM.findDOMNode(this.rack).querySelectorAll('.tile');

    this.draggable = Draggable.create(rackTiles, {
      onDragStart: () => {
        console.log(this.draggable);
      },
      onDragEnd: () => {
        console.log(this.draggable);

      }
    });

  }

  componentWillMount() {
  }

  gotoGame(obj) {
    GameActions.getGame(obj);
  }

  getValue(boardLetter) {
    return this.props.letters.filter(letter => {
        return letter.letter === boardLetter;
    })[0];
  }

  getLetter(tiles, col, row) {
    const found = tiles.filter(tile => {
        return tile[0] === col && tile[1] === row;
    });
    return found.length > 0 ? found[0][2] : '';
  }

  getTile(tiles, col, row) {
    this.letters[col][row] = this.getLetter(tiles, col, row);
    const value = this.letters[col][row].length > 0 ? this.getValue(this.letters[col][row]).value : 0;
    const lastPlayed = this.props.game.last_move.move.filter(move => {
      return move[0] === col && move[1] === row
    });
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

  getAdjacentTiles(tiles) {

    let adjTiles = [];
    for (let c = 0; c < 15; c++) {
      for (let r = 0; r < 15; r++) {
        const found = tiles.filter(tile => {
          return ((( c === tile[0] && (r + 1) === tile[1] )  ||
                   ( c === tile[0] && (r - 1) === tile[1] )) &&
                  tiles.filter(tileX => {
                    return c === tileX[0] && r === tileX[1]
                  }).length === 0)
        });
        found.length > 0 && adjTiles.push([c,r]);
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
        found.length > 0 && (' ' + adjTiles.join(' | ') + ' ').indexOf(' ' + c + ',' + r + ' ') < 0 && adjTiles.push([c,r]);
      }
    }
    return adjTiles;

  }

  findWords(rack, adjTiles, board, tiles) {
    console.log('rack', rack);
    console.log('adjTiles', adjTiles);
    console.log('board', board);
    console.log('tiles', tiles);
  }

  render() {
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
    this.missingWords = this.words.filter(word => {
      return this.props.dictionary.words.indexOf(word.toLowerCase()) === -1;
    });
    console.log('missing words', this.missingWords);
    this.adjTiles = this.getAdjacentTiles(this.props.game.tiles);
    const newWords = this.findWords(rack, this.adjTiles, this.props.board, this.props.game.tiles);
    return (
      <div class="game-board">
        <ul class="score">
          <li>{this.props.game.players[0].username} ({this.props.game.players[0].score})</li>
          <li>{this.props.game.players[1].username} ({this.props.game.players[1].score})</li>
        </ul>
        <ul class="score-last">
          <li>{this.props.game.current_player === 1 && this.props.game.last_move.points}</li>
          <li>{this.props.game.current_player === 0 && this.props.game.last_move.points}</li>
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
          board={this.props.board}
          tiles={this.props.game.tiles}
          rack={rack}
        />
      </div>
    );
  }
}
