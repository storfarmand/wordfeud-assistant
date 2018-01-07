import React from 'react';

export default class Hints extends React.Component {

  constructor() {
    super();

  }

  componentDidMount() {

  }

  componentWillMount() {
  }

  render() {
    console.log('board', this.props.board);
    console.log('tiles', this.props.tiles);
    console.log('rack', this.props.rack);
    return (
      <div class="hints">
      </div>
    );
  }
}
