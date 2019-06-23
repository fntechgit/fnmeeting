import React from "react";
export default (props) => <div className={'meeting-room-availability'}>
	<div className={'col-xs-12 meeting-room-availability-date'}>
		<h3>Day 1 Availability</h3>
		(2019 October 17)
	</div>
	<div className={'meeting-room-availability-body col-xs-12'}>
		<div onClick={()=>{props.onSelect('5')}} className={'meeting-room-availability-slot'}>9am - 11pm </div>
		<div className={'meeting-room-availability-slot'}>1pm - 2pm </div>
		<div className={'meeting-room-availability-slot'}>3pm - 5pm </div>
		<div className={'meeting-room-availability-slot'}>8pm - 10pm </div>
	</div>
</div>

