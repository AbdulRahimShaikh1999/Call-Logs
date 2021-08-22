import React from 'react'
import { Link } from 'react-router-dom';

import CallIcon from './CallIcon.jsx';

const CallItem = ({ id, number, color, description, time, timePeriod, date }) => {
	return (
		<Link to={'/detail/' + id} className="callItemOuter">
			<div className="callDate">
				<p>{ date }</p>
			</div>
			<div className="call">
			<div className="callItem">
				<div className="callIcon">
					<CallIcon fill={color} />
				</div>
				<div className="callInfo">
					<span>+ { number ? number : 'Unknown' }</span>
					<p>{ description }</p>
				</div>
				<div className="callTime">
					<span>{ time }</span>
					<span className="callTimePeriod">{ timePeriod }</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CallItem
