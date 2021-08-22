import React from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";

import ActivityFeed from "./pages/ActivityFeed.jsx";
import ActivityDetail from "./pages/ActivityDetail.jsx";

const MONTHS = [
	"Jan",
	"Feb",
	"March",
	"Apr",
	"May",
	"June",
	"July",
	"August",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feed: [],
			filteredFeed: [],
			searchText: "",
			message: false,
		};
	}

	componentDidMount() {
		console.log("component did mount");
		fetch("https://aircall-job.herokuapp.com/activities").then((jsonData) => {
			jsonData.json().then((data) => {
				console.log("data: ", data);
				// filter the data
				const filteredData = [];
				for (let feedData of data) {
					filteredData.push(this.filterData(feedData));
				}
				// set to state
				this.setState({
					feed: filteredData,
				});
			});
		});
	}

	filterFeedBySearch(value) {
		const feedCopy = [...this.state.feed];
		console.log("feedCopy: ", feedCopy);
		const filteredFeed = feedCopy.filter((item) => {
			if (item.from.toLowerCase().includes(value.toLowerCase())) {


				return true;
			}
			if (item.to && item.to.toLowerCase().includes(value.toLowerCase())) {
				return true;
			}
			if (item.description && item.description.toLowerCase().includes(value.toLowerCase())) {


				return true;
			}
			if (item.number && item.number.toLowerCase().includes(value.toLowerCase())) {


				return true;
			}
			return false


		}

		);
		console.log("filteredFeed: ", filteredFeed);
		return filteredFeed;
	}

	searchHandler({ target: { value } }) {
		const filteredFeed = this.filterFeedBySearch(value);
		this.setState({
			...this.state,
			searchText: value,
			filteredFeed,
		});
	}

	filterDescription(callType, from) {
		let description;
		let color = "#009933";
		if (callType === "missed") {
			description = "tried to call on " + from;
			color = "#ff0000";
		} else if (callType === "answered") {
			description = "received call from " + from;
		} else if (callType === "voicemail") {
			description = "received voicemail from " + from;
			color = "#0066ff";
		}
		return {
			description,
			color,
		};
	}

	getFullDate(day, month, year) {
		return MONTHS[month] + ", " + day + " " + year;
	}

	getFullTime(hours, minutes) {
		if (hours <= 9) {
			hours = "0" + hours;
		} else if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return hours + ":" + minutes;
	}

	filterDateAndTime(dateTime) {
		const jsDateObj = new Date(dateTime);
		const day = jsDateObj.getDate();
		const month = jsDateObj.getMonth();
		const year = jsDateObj.getFullYear();
		const hours = jsDateObj.getHours();
		const minutes = jsDateObj.getMinutes();

		return {
			date: this.getFullDate(day, month, year),
			time: this.getFullTime(hours, minutes),
			timePeriod: hours >= 12 ? "PM" : "AM",
		};
	}

	filterData(data) {
		const { description, color } = this.filterDescription(
			data.call_type,
			data.from
		);
		const { date, time, timePeriod } = this.filterDateAndTime(data.created_at);
		return {
			id: data.id,
			number: data.to,
			color,
			description,
			time,
			timePeriod,
			date,
			from: data.from,
		};
	}

	archiveDeleteHandler(id) {
		console.log("id: ", id);
		// filter other than id
		const unArchivedFeed = this.state.feed.filter(
			(item) => item.id !== parseInt(id)
		);
		console.log("unArchivedFeed: ", unArchivedFeed);
		this.setState({
			message: true,
			feed: [...unArchivedFeed],
		});
		this.props.history.goBack();
		setTimeout(() => {
			this.setState({
				feed: [...unArchivedFeed],
				message: false,
			});
		}, 3000);
	}

	render() {
		return (
			<main className="main">
				{this.state.message && (
					<div className="message">Contact archived successfully.</div>
				)}
				<Switch>
					<Route path="/" exact>
						<ActivityFeed
							feed={
								this.state.searchText
									? this.state.filteredFeed
									: this.state.feed
							}
							searchHandler={this.searchHandler.bind(this)}
							searchText={this.state.searchText}
						/>
					</Route>
					<Route path="/detail/:id" exact>
						<ActivityDetail
							archiveDeleteHandler={this.archiveDeleteHandler.bind(this)}
						/>
					</Route>
				</Switch>
			</main>
		);
	}
}

export default withRouter(Main);
