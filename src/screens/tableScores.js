import React, { Component } from "react";
import { API } from "aws-amplify";

let apiName = "scoretrackerApi";
let path = "/scores";

class TableScores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };
  }

  getScores() {
    API.get(apiName, path).then((response) => {
      // console.log("getScores: " + JSON.stringify(response.data));
      this.setState({
        scores: response.data,
      });
    });
  }

  componentDidMount() {
    this.getScores();
  }

  renderTableData() {
    return this.state.scores.map((scores) => {
      const {
        ID,
        playerOneID,
        playerOneScore,
        playerTwoID,
        playerTwoScore,
      } = scores;
      return (
        <tr key={ID}>
          <td>{playerOneID}</td>
          <td>
            {playerOneScore} - {playerTwoScore}
          </td>
          <td>{playerTwoID}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = ["Player 1", "Score", "Player 2"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Game Scores</h1>
        <table id="scores">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableScores;