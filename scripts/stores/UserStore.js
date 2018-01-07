import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  login(data) {
    this.emit('user:login', data);
  }

  handleActions(evt) {
    switch(evt.type) {
      case "USER":
        switch (evt.action) {
          case "LOGIN":
            this.login(evt.data);
            break;
        }
    }
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
