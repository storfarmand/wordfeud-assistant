class WordfeudService {
  constructor(api) {
    this.api = api;
    console.log(api);
  }

  // Private method
  async login(email, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let wfRequest = {
      uri: 'http://localhost/api.php?action=login&email=' + email + '&password=' + password,
      options: {
        method: 'POST',
        headers: headers
      }
    }
    const response = await fetch(wfRequest.uri, wfRequest.options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  // Private method
  async gamesList(sessionId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let wfRequest = {
      uri: 'http://localhost/api.php?action=gamesList&sessionId=' + sessionId,
      options: {
        method: 'POST',
        headers: headers
      }
    }
    const response = await fetch(wfRequest.uri, wfRequest.options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

    // Private method
    async getGame(sessionId, gameId) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let wfRequest = {
        uri: 'http://localhost/api.php?action=getGame&sessionId=' + sessionId + '&gameId=' + gameId,
        options: {
          method: 'POST',
          headers: headers
        }
      };
      const response = await fetch(wfRequest.uri, wfRequest.options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data.game;
    }

    // Private method
    async getBoard(sessionId, boardId) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let wfRequest = {
        uri: 'http://localhost/api.php?action=getBoard&sessionId=' + sessionId + '&boardId=' + boardId,
        options: {
          method: 'POST',
          headers: headers
        }
      }
      const response = await fetch(wfRequest.uri, wfRequest.options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data.board;
    }

}

export default WordfeudService;
