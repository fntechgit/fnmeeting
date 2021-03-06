import React from "react";
import {getDayNumberFromDate, getFormatedDate, getFormatedTime} from '../utils/helpers'
import T from "i18n-react";
import moment from "moment-timezone";
import { epochToMomentTimeZone, epochToMoment } from "openstack-uicore-foundation/lib/methods";

export default (props) => {
	let currentDay = getDayNumberFromDate(props.days, props.date);
	let currentIndex = currentDay - 1
	let previousIndex = (currentIndex > 0) ? currentIndex - 1 : false;
	let nextIndex = (currentIndex + 1 < props.days.length) ? currentIndex + 1 : false;

	return <div className={'meeting-room-availability'}>
	<div className={'row meeting-room-availability-date'}>
		<div className={'col-xs-2 nav-arrow prev-arrow'}>{previousIndex || previousIndex === 0  ? <i className='fa-arrow-left fa' onClick={()=>{props.changeDate(props.days[previousIndex])}} /> : null}</div>
		<div className={'col-xs-8'}><h3>Day {currentDay} Availability</h3>{getFormatedDate(props.date, props.time_zone)}</div>
		<div className={'col-xs-2 nav-arrow next-arrow'}>{nextIndex ? <i className='fa-arrow-right fa' onClick={()=>{props.changeDate(props.days[nextIndex])}} /> : null}</div>
	</div>
	<div className={'meeting-room-availability-body col-xs-12'}>
		{props.availability && props.availability.data !== null ?
			props.availability.data.map((a)=>{
				let isAvailable = a.status === 'Available';
				let formatedStartTime = epochToMomentTimeZone(a.start_date, props.time_zone).format('HH:mm');
				let formatedEndTime = epochToMomentTimeZone(a.end_date, props.time_zone).format('HH:mm');

				if(isAvailable){
					return (
						<div key={a.start_date} onClick={()=>{props.onSelect(a)}} className={'meeting-room-availability-slot available'}>
							{T.translate("bookable_room.available")}
							<br/>
							{formatedStartTime} - {formatedEndTime}
						</div>
					);
				} else {
					return (
						<div key={a.start_date} className={'meeting-room-availability-slot unavailable'}>
							{T.translate("bookable_room.unavailable")}
							<br/>
							{formatedStartTime} - {formatedEndTime}
						</div>
					);
				}

			}) : null }
	</div>
</div>
}

