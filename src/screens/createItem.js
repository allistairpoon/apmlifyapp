import React, { Component } from 'react';
import { Form, Modal, Button, Container } from 'semantic-ui-react'
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');
let apiName = 'sampleCloudApi';
let path = '/items';

class CreateItemModal extends Component {



  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event, {name, value}) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log(this);
    let apiName = 'sampleCloudApi';
    let path = '/items';
    let newItem = {
      body: {
          "ID": uuidv1(),
          "ItemName": this.state.itemName,
          "ItemPrice": this.state.itemPrice,
          "ItemDescription": this.state.itemDescription
        }
      }
    API.post(apiName, path, newItem).then(response => {
    console.log(response)
    }).catch(error => {
        console.log(error.response)
    });
    event.preventDefault();
    this.props.getItems()
    this.handleClose()
  }

  handleOpen = () => this.setState({ modalOpen: true, itemName: '', itemPrice: '', itemDescription: '' })

  handleClose = () => this.setState({ modalOpen: false })



  render () {
    return (
        <Modal trigger={<Button onClick={this.handleOpen}>+ Add score</Button>} closeIcon={true} open={this.state.modalOpen} onClose={this.handleClose}>
          <Modal.Header>Add an Score</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit} >
              <Form.Group unstackable widths={2}>
                <Form.Input name='itemPrice' label='Player 1' placeholder='Name...' onChange={this.handleChange}  value={this.state.itemPrice} />
                <Form.Input name='itemDescription' label='Player 2' placeholder='The score...' onChange={this.handleChange}  value={this.state.itemDescription}/>
              </Form.Group>
              <Form.Group unstackable widths={2}>
                {/* <Form.FormDropdown name='itemPrice' label='Score 1'  />
                <Form.FormDropdown name='itemDescription' label='Score 2' /> */}
              </Form.Group>
              <Form.TextArea  name='itemName' label='Score' placeholder='Name...' onChange={this.handleChange}  value={this.state.itemName} />

              <Form.Button type='submit'>Submit</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      );
    }
  }

export default CreateItemModal;