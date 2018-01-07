import dispatcher from '../dispatcher';

export function getGame(data) {
  dispatcher.dispatch({
    type: "GAME",
    action: "GET",
    data
  });
}
