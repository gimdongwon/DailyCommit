import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as waitingAcitons from "../store/modules/waiting";
import WaitingList from "../components/WaitingList";

class WaitingListContainer extends Component {
  handleChange = e => {
    const { WaitingActions } = this.props;
    WaitingActions.changeInput(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { WaitingActions, input } = this.props;
    WaitingActions.create(input);
    WaitingActions.changeInput("");
  };

  handleEnter = id => {
    const { WaitingActions } = this.props;
    WaitingActions.enter(id);
  };
  handleLeave = id => {
    const { WaitingActions } = this.props;
    WaitingActions.leave(id);
  };
  render() {
    const { input, list } = this.props;
    return (
      <WaitingList
        input={input}
        waitingList={list}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      />
    );
  }
}

const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  list: waiting.list
});

const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingAcitons, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);
