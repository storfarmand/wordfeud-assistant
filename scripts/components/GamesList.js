import React from 'react';

import * as GameActions from '../actions/GameActions';

export default class GamesList extends React.Component {

  constructor() {
    super();

  }

  componentDidMount() {

  }

  componentWillMount() {
  }

  gotoGame(obj) {
    GameActions.getGame(obj);
  }

  render() {
    console.log('games list', this.props.gamesList);
    const games = this.props.gamesList.games
      .filter(game => {
        return game.is_running;
      })
      .map((game, idx) => {
        return <li
          key={idx}
          onClick={this.gotoGame.bind(this, {id: game.id})}
          >{game.players[0].username} / {game.players[1].username}</li>;
      });
    return (
      <div class="games-list">
        <ul>
          {games}
        </ul>
      </div>
    );
  }
}
