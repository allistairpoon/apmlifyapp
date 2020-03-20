import React, { Component } from "react";
import { Container, Card, Menu } from "semantic-ui-react";
import Amplify, { API } from "aws-amplify";
import _ from "lodash";
import EditItemModal from "./editItem.js";
import CreateItemModal from "./createItem";
import { Dropdown } from "semantic-ui-react";

const uuidv1 = require('uuid/v1');

let apiName = "sampleCloudApi";
let path = "/items";

const scores = [{
  key: '1',
  text: '1',
  value: '1'
},
{
  key: '2',
  text: '2',
  value: '2'
}]

class ItemDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { itemData: {}, item: {}, modalOpen: false };
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    API.get(apiName, path).then(response => {
      console.log(response);
      this.setState({
        itemData: response.data
      });
    });
  }

  getItem(id) {
    let single_path = "/items/" + id;
    console.log(single_path);
    API.get(apiName, single_path).then(response => {
      console.log(response);
      this.setState({
        item: response
      });
    });
    return this.state.item;
  }

  componentDidMount() {
    this.getItems();
  }

  handleSubmit(event) {
    console.log(this);
    let apiName = 'sampleCloudApi';
    let path = '/players';
    let newItem = {
      body: {
          "ID": uuidv1(),
          "ItemName": "this.state.itemName"
        }
      }
    API.post(apiName, path, newItem).then(response => {
    console.log(response)
    }).catch(error => {
        console.log(error.response)
    });
    event.preventDefault();
    // this.props.getItems()
    // this.handleClose()
  }

  render() {
    const itemData = this.state.itemData;
    return (
      <div>
        <Dropdown
          placeholder="Select Score"
          fluid
          selection
          options={scores}
        />
        <div/>
        {/* <button onClick={this.handleSubmit}>Enter</button> */}
        <CreateItemModal getItems={this.getItems} />
        {/* 
        <Container style={{padding: 10}}>
        <Card.Group>
        {_.map(itemData, ({ID, ItemName, ItemPrice, ItemDescription }) => (
            <Card onClick={() => this.getItem(ID)}>
              <Card.Content>
                <Card.Header selectable>
                {ItemName}
                </Card.Header>
                <Card.Meta>
                  £ {ItemPrice}
                </Card.Meta>
                <Card.Description>
                    {ItemDescription}
                </Card.Description>
              </Card.Content>
              <EditItemModal item={Object.values(this.state.item)} getItems={(this.getItems)} />
            </Card>
          ))}
        </Card.Group>
      </Container> */}
      </div>
    );
  }
}

export default ItemDashboard;
