import React from "react";
import moment from 'moment';
import {getDayNumberFromDate} from '../utils/helpers'

export default (props) => {

	let currentDay = getDayNumberFromDate(props.days, props.date);
	let currentIndex = currentDay - 1
	let previousIndex = (currentIndex > 0) ? currentIndex - 1 : false;
	let nextIndex = (currentIndex + 1 < props.days.length) ? currentIndex + 1 : false;
	
	
	return <div className={'meeting-room-availability'}>
	<div className={'row meeting-room-availability-date'}>
		<div className={'col-xs-2'}>{previousIndex || previousIndex === 0  ? <i className='fa-arrow-left fa' onClick={()=>{props.changeDate(props.days[previousIndex])}} /> : null}</div>
		<div className={'col-xs-8'}><h3>Day {currentDay} Availability</h3>{moment.unix(props.date).format('MMM Do YYYY')}</div>
		<div className={'col-xs-2'}>{nextIndex ? <i className='fa-arrow-right fa' onClick={()=>{props.changeDate(props.days[nextIndex])}} /> : null}</div>
	</div>
	<div className={'meeting-room-availability-body col-xs-12'}>
		{props.availability && props.availability.data !== null ? props.availability.data.map((a)=>{return <div key={a.start_date} onClick={()=>{props.onSelect(a)}} className={'meeting-room-availability-slot'}>Available<br/>{moment.unix(a.start_date).format('HH:mm')} - {moment.unix(a.end_date).format('HH:mm')} </div>}) : null }
	</div>
</div>	
}

