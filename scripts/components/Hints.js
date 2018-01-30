import React from 'react';

export default class Hints extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="hints">
        {this.props.words}
      </div>
    );
  }
}
