import React from "react"
import moment from 'moment'
export default ({image, name, capacity, floor, amenities, actionLabel, action, room, start_time, end_time, status}) => <div className={'meeting-room'}>
	<div className={'meeting-room-image'} style={{backgroundImage: `url('${image}'`}}> </div>
		<div className={'meeting-room-body'}>
			<div className={'row'}>
				<div className={'col-xs-12 meeting-room-title'}>
					<div>{name}{start_time ? <span> - {moment.unix(start_time).format('MMM Do YYYY')}, {moment.unix(start_time).format('HH:mm')} - {moment.unix(end_time).format('HH:mm')}</span> : null}</div>
				</div>
			</div>

			{status ? <div className={'row row meeting-room-info'}>
				<div className={'col-xs-12'}>
					Status: {status}
				</div>
			</div> : null}
			
			<div className={'row meeting-room-info'}>
				<div className={'col-xs-6'}>
					<div>Capacity:{capacity}</div>
				</div>
				<div className={'col-xs-6'}>
					<div>Floor: {floor}</div>
				</div>
			</div>
			<div className={'row meeting-room-amenities'}>
				<div className={'col-xs-12'}>
					Amenities: {amenities}
				</div>
			</div>
			
			{actionLabel && action ? 
			<div onClick={()=>{action(room)}} className={'availability-button'}>{actionLabel}
				<i className="fa-arrow-right fa"></i>
			</div>
				: null}
		</div>
	</div>

