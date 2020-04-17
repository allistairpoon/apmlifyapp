import React, { Component } from "react";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { Segment, Menu } from "semantic-ui-react";
import PlayersForm from "./screens/playersForm";
import ScoresForm from "./screens/scoresForm";
import TableScores from "./screens/tableScores";
import "./App.css";

Amplify.configure(aws_exports);

class App extends Component {

  render() {
    return (
      <Segment>
        <Menu>
          <Menu.Item name="Scores" />
          <Menu.Item name="Players" />
        </Menu>
        <ScoresForm />
        <PlayersForm />
        <TableScores />
      </Segment>
    );
  }
}

export default App;