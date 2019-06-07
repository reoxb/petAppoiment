import React, { Component } from "react";
import _ from "lodash";
import AptList from './AptList';
import AddAppointment from './AddAppointment';
import SearchAppointments from './SearchAppointments';

class MainInterface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aptBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      myAppointments: []
    };

    this.deleteMessage = this.deleteMessage.bind(this);
    this.toggleAddDisplay = this.toggleAddDisplay.bind(this);
    this.addItem = this.addItem.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
  }

  componentDidMount() {

  } //componentDidMount

  componentWillUnmount(){
    this.serverRequest.abort();
  } //componentWillUnmount

  deleteMessage(item) {
    var allApts = this.state.myAppointments;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts
    }); //setState
  } //deleteMessage

  toggleAddDisplay() {
    var tempVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: tempVisibility
    }); //setState
  } //toggleAddDisplay

  addItem(tempItem) {
    var tempApts = this.state.myAppointments;
    tempApts.push(tempItem);
    this.setState({
      myAppointments: tempApts
    }); //setState
  } //addItem

  reOrder(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    }); //setState
  } //reOrder

  searchApts(q) {
    this.setState({
      queryText: q
    }); //setState
  } //searchApts

  render(){
    var filteredApts = [];
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this.state.queryText;
    var myAppointments = this.state.myAppointments; 

    myAppointments.forEach(function(item) {
      if(
        (item.petName.toLowerCase().indexOf(queryText)!== -1) ||
        (item.ownerName.toLowerCase().indexOf(queryText)!== -1) ||
        (item.aptDate.toLowerCase().indexOf(queryText)!== -1) ||
        (item.aptNotes.toLowerCase().indexOf(queryText)!== -1)
      ) {
        filteredApts.push(item);
      }
    }); //forEach

    filteredApts = _.orderBy(filteredApts, function(item) {
      return item[orderBy].toLowerCase();
    }, orderDir);//orderBy

    filteredApts = filteredApts.map(function(item, index) {
      return(
        <AptList key = { index }
          singleItem = { item }
          whichItem = { item }
          onDelete = { this.deleteMessage } />
      ) //return
    }.bind(this)); //filteredApts.map

    return (
      <div className="interface">

        <AddAppointment
          bodyVisible = { this.state.aptBodyVisible }
          handleToggle = { this.toggleAddDisplay }
          addApt = { this.addItem }
        />

        <SearchAppointments
          orderBy = { this.state.orderBy }
          orderDir = { this.state.orderDir }
          onReOrder = { this.reOrder }
          onSearch = { this.searchApts }
        />

        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
} //MainInterface

export default MainInterface;
