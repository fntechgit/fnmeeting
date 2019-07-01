import React from "react";
import moment from 'moment';
import {getDayNumberFromDate} from '../utils/helpers'

export default (props) => <div className={'meeting-room-availability'}>
	<div className={'col-xs-12 meeting-room-availability-date'}>
		<h3>Day {getDayNumberFromDate(props.days, props.date)} Availability</h3>
		{moment.unix(props.date).format('MMM Do YYYY')}
	</div>
	<div className={'meeting-room-availability-body col-xs-12'}>
		{props.availability && props.availability.data !== null ? props.availability.data.map((a)=>{return <div key={a.start_date} onClick={()=>{props.onSelect(a)}} className={'meeting-room-availability-slot'}>{moment.unix(a.start_date).format('HH:mm')} - {moment.unix(a.end_date).format('HH:mm')} </div>}) : null }
	</div>
</div>

