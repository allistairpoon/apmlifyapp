import React, { Component } from "react";
import CreatePlayer from "./createPlayer";

class PlayersForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div />
        <CreatePlayer />
      </div>
    );
  }
}

export default PlayersForm;
