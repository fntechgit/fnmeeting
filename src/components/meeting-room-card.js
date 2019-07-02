import React from "react"
import {getFormatedDate, getFormatedTime} from "../utils/helpers";
import T from "i18n-react";

export default ({image, name, capacity, floor, amenities, actionLabel, action, room, start_time, end_time, status}) => <div className={'meeting-room'}>
	<div className={'meeting-room-image'} style={{backgroundImage: `url('${image ? image : 'https://via.placeholder.com/250'}'`}}> </div>
		<div className={'meeting-room-body'}>
			<div className={'row'}>
				<div className={'col-xs-12 meeting-room-title'}>
					<div>{name}{start_time ? <span> - {getFormatedDate(start_time)}, {getFormatedTime(start_time)} - {getFormatedTime(end_time)}</span> : null}</div>
				</div>
			</div>

			{status ? <div className={'row row meeting-room-info'}>
				<div className={'col-xs-12'}>
					{T.translate("bookable_room.status")} : {status}
				</div>
			</div> : null}
			
			<div className={'row meeting-room-info'}>
				<div className={'col-xs-6'}>
					<div>
						{T.translate("bookable_room.capacity")} : {capacity}
					</div>
				</div>
				<div className={'col-xs-6'}>
					<div>
						{T.translate("bookable_room.floor")} : {floor}
					</div>
				</div>
			</div>
			<div className={'row meeting-room-amenities'}>
				<div className={'col-xs-12'}>
					{T.translate("bookable_room.amenities")} : {amenities}
				</div>
			</div>
			
			{actionLabel && action ? 
			<div onClick={()=>{action(room)}} className={'availability-button'}>{actionLabel}
				<i className="fa-arrow-right fa"></i>
			</div>
				: null}
		</div>
	</div>

