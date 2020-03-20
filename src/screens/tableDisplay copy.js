import React, { Component } from "react";
import Amplify, { API } from 'aws-amplify';

let apiName = 'sampleCloudApi';
let path = '/items';

class TableDisplay extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      // state is by default an object
      students: [
        { id: 1, name: "1", age: 21, email: "1@email.com", itemname: ""},
        // { id: 2, name: "2", age: 19, email: "2@email.com", itemData: {} },
        // { id: 3, name: "3", age: 16, email: "4@email.com", itemData: {} },
        // { id: 4, name: "4", age: 25, email: "3@email.com", itemData: {} }
      ],
      itemData : [
        
      ]
    };
  }

  getItems(){
    API.get(apiName, path).then(response => {
      console.log("here!:::" + JSON.stringify(response.data))
      this.setState({
       itemData: response.data
      });
    });
  }

  componentDidMount(){
    this.getItems()
  }

  renderTableData() {
    const itemData = this.state.itemData;

    return this.state.students.map((student) => {
      const { id, name, age, email, itemname} = student; //destructuring
      return (
        <tr key={id} getItems={this.getItems}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
          <td>{itemname}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div>
        <h1 id="title">Table</h1>
        <table id="students">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableDisplay;