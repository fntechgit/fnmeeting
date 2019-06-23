import React from "react";
export default ({image, name, capacity, floor, amenities, actionLabel, action, room}) => <div className={'meeting-room'}>
	<div className={'meeting-room-image'} style={{backgroundImage: `url('${image}'`}}> </div>
		<div className={'meeting-room-body'}>
			<div className={'row'}>
				<div className={'col-xs-12 meeting-room-title'}>
					<div>{name}</div>
				</div>
			</div>
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

