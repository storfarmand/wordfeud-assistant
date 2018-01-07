import dispatcher from '../dispatcher';

export function login(data) {
  dispatcher.dispatch({
    type: "USER",
    action: "LOGIN",
    data
  });
}
