import React, { Component } from "react";
import { connect } from "react-redux";

import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h3>{this.props.clickedDay || "Upcoming events"}</h3>
        <div className="events_content"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Sidebar);
