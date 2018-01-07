import React from 'react';

import Login from '../components/Login';
import GamesList from '../components/GamesList';
import GameBoard from '../components/GameBoard';

import UserStore from '../stores/UserStore'
import GameStore from '../stores/GameStore'

import WordfeudService from '../services/WordfeudService';

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: '{}',
      state: 'initial',
      sessionId: undefined,
      gamesList: [],
      game: [],
      board: []
    };
    this.wordfeudService = new WordfeudService(props.api);
  }

  componentWillMount() {
    UserStore.on('user:login', (evt) => {
      this.wordfeudService.login(evt.user, evt.password)
        .then(data => {
          this.wordfeudService.gamesList(data.sessionId)
            .then(gamesList=> {
              this.setState({
                state: 'gamesList',
                sessionId: data.sessionId,
                gamesList
              });
            });
        });
    });
    GameStore.on('game:get', (evt) => {
      this.wordfeudService.getGame(this.state.sessionId, evt.id)
        .then(game => {
          this.wordfeudService.getBoard(this.state.sessionId, game.board)
            .then(board => {
              this.setState({
                state: 'gameBoard',
                game,
                board
              });
            });
        });
    });
  }

  componentDidMount() {

  }

  render() {
    let component = null;
    switch (this.state.state) {
      case 'initial':
        component = <Login />;
        break;
      case 'gamesList':
        component = <GamesList
                      sessionId={this.state.sessionId}
                      gamesList={this.state.gamesList}
                    />;
        break;
      case 'gameBoard':
        component = <GameBoard
                      sessionId={this.state.sessionId}
                      game={this.state.game}
                      board={this.state.board}
                      letters={this.props.constants.letters}
                      dictionary={this.props.words}
                    />;
        break;
      default:
        component = <Login />;
    }
    return (
      <div class={[
          "experience"
        ].join(' ')}>
        {component}
      </div>
    );

  }
}
