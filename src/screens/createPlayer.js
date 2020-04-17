import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";
import { API } from "aws-amplify";
const uuidv1 = require("uuid/v1");

let apiName = "scoretrackerApi";
let path = "/players";

class CreatePlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let newPlayer = {
      body: {
        ID: uuidv1(),
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      },
    };
    API.post(apiName, path, newPlayer)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
    this.handleClose();
  }

  handleOpen = () =>
    this.setState({ modalOpen: true, ID: "", firstName: "", lastName: "" });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add Player</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add Player</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group unstackable widths={2}>
              <Form.Input
                name="firstName"
                label="First Name"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
              <Form.Input
                name="lastName"
                label="Last Name"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </Form.Group>
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreatePlayer;