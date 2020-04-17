import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";
import { API } from "aws-amplify";
const uuidv1 = require("uuid/v1");

const scoreValues = [
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
  { key: "4", text: "4", value: "4" },
  { key: "5", text: "5", value: "5" },
  { key: "6", text: "6", value: "6" },
  { key: "7", text: "7", value: "7" },
  { key: "8", text: "8", value: "8" },
  { key: "9", text: "9", value: "9" },
  { key: "10", text: "10", value: "10" },
];

class CreateScoreModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getPlayers() {
    let apiName = "scoretrackerApi";
    let path = "/players";
    API.get(apiName, path).then((response) => {
      console.log("getPlayers: " + JSON.stringify(response.data));
      // this.setState({
      //   scores: response.data,
      // });
    });
  }

  componentDidMount() {
    this.getPlayers();
  }

  // getItems() {
  //   API.get(apiName, path).then((response) => {
  //     console.log(response);
  //     this.setState({
  //       itemData: response.data,
  //     });
  //   });
  // }

  // getItem(id) {
  //   let single_path = "/scoretracker/" + id;
  //   console.log(single_path);
  //   API.get(apiName, single_path).then((response) => {
  //     console.log(response);
  //     this.setState({
  //       item: response,
  //     });
  //   });
  //   return this.state.item;
  // }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let apiName = "scoretrackerApi";
    let path = "/scores";
    let newScore = {
      body: {
        ID: uuidv1(),
        playerOneID: this.state.playerOneID,
        playerOneScore: this.state.playerOneScore,
        playerTwoID: this.state.playerTwoID,
        playerTwoScore: this.state.playerTwoScore,
        timestamp: Date.now().toString(),
      },
    };
    API.post(apiName, path, newScore)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
    this.handleClose();
  }

  handleOpen = () =>
    this.setState({
      modalOpen: true,
      playerOneID: "",
      playerOneScore: "",
      playerTwoID: "",
      playerTwoScore: "",
    });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add score</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add an Score</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group unstackable widths={2}>
              <Form.Input
                name="playerOneID"
                label="Player 1"
                onChange={this.handleChange}
                value={this.state.playerOneID}
              />
              <Form.Input
                name="playerTwoID"
                label="Player 2"
                onChange={this.handleChange}
                value={this.state.playerTwoID}
              />
            </Form.Group>
            <Form.Group unstackable widths={2}>
              <Form.Select
                fluid
                options={scoreValues}
                placeholder="Select Score"
                onChange={this.handleChange}
                name="playerOneScore"
                value={this.state.playerOneScore}
              />
              <Form.Select
                fluid
                options={scoreValues}
                placeholder="Select Score"
                onChange={this.handleChange}
                name="playerTwoScore"
                value={this.state.playerTwoScore}
              />
            </Form.Group>
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateScoreModal;