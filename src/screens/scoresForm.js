import React, { Component } from "react";
import CreateScoreModal from "./createScore";

class ScoresForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div />
        <CreateScoreModal />
      </div>
    );
  }
}

export default ScoresForm;