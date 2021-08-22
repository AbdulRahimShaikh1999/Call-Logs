import React from "react";
import { withRouter } from "react-router-dom";

import Loader from "../Loader.jsx";

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    console.log("location: ", this.props.location);
    const id = this.props.location.pathname.split("/")[2];
    console.log(id);
    fetch("https://aircall-job.herokuapp.com/activities/" + id).then(
      (jsonData) => {
        jsonData.json().then((data) => {
          console.log("details: ", data);
          this.setState({
            detail: data,
          });
        });
      }
    );
  }

  archiveDetail() {
    const id = this.props.location.pathname.split("/")[2];
    this.setState({
      ...this.state,
      isLoading: true,
    });
    fetch("https://aircall-job.herokuapp.com/activities/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archived: true }),
    })
      .then((res) => {
        console.log("archive response: ", res);
        setTimeout(() => {
          this.setState({
            ...this.state,
            isLoading: false,
          });
          this.props.archiveDeleteHandler(
            this.props.location.pathname.split("/")[2]
          );
          //   this.props.history.goBack();
        }, 3000);
      })
      .catch((err) =>
        console.log("Error while archiving detail: ", err, err.message)
      );
  }

  render() {
    return (
      this.state.detail && (
        <React.Fragment>
          {this.state.message && (
            <div className="message">Contact archived successfully!</div>
          )}
          <div className="goBack">
            <button
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Back
            </button>
          </div>
          <p className="detailHeading">
            <span>From: </span> {this.state.detail.from}
          </p>
          <p className="detailHeading">
            <span>Mobile: </span> {this.state.detail.to}
          </p>
          <p className="detailHeading">
            <span>Duration: </span> {this.state.detail.duration}
          </p>
          <p className="detailHeading">
            <span>Via: </span> {this.state.detail.via}
          </p>
          <p className="detailHeading">
            <span>Direction: </span> {this.state.detail.direction}
          </p>
          <p className="detailHeading">
            <span>Call Type: </span> {this.state.detail.call_type}
          </p>
          <p className="detailHeading">
            <span>Archived: </span>{" "}
            {this.state.detail.is_archived ? "Yes" : "No"}
          </p>
          {/* <button className="archiveButton" onClick={() => { this.props.archiveDeleteHandler(this.props.location.pathname.split("/")[2]) }}>Archive</button> */}
          {!this.state.detail.is_archived && (
            <button
              className="archiveButton"
              onClick={this.archiveDetail.bind(this)}
            >
              Archive
            </button>
          )}
          {this.state.isLoading && <Loader />}
        </React.Fragment>
      )
    );
  }
}

export default withRouter(ActivityDetail);
