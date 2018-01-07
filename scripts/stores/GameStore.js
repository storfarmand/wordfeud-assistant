import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class GameStore extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  getGame(data) {
    this.emit('game:get', data);
  }

  handleActions(evt) {
    switch(evt.type) {
      case "GAME":
        switch (evt.action) {
          case "GET":
            this.getGame(evt.data);
            break;
        }
    }
  }

}

const gameStore = new GameStore;
dispatcher.register(gameStore.handleActions.bind(gameStore));

export default gameStore;
