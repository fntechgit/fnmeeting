import React from "react";
export default (props) => <div className={'meeting-room-availability'}>
	<div className={'col-xs-12 meeting-room-availability-date'}>
		<h3>Day 1 Availability</h3>
		(2019 October 17)
	</div>
	<div className={'meeting-room-availability-body col-xs-12'}>
		{props.availability && props.availability.data !== null ? props.availability.data.map((a)=>{return <div key={a.start_date} onClick={()=>{props.onSelect(a)}} className={'meeting-room-availability-slot'}>{a.start_date} - {a.end_date} </div>}) : null }
	</div>
</div>

