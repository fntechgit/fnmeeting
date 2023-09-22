import React from "react"
import {getFormatedDate, getFormatedTime} from "../utils/helpers";
import T from "i18n-react";
import defaultImage from '../styles/images/default.png';

export default ({room, reservation, time_zone, actionLabel, action, nowUtc, onCancel}) => {
  const {id, floor, image, name, attributes, capacity} = room || {};
  const {created, start_datetime, end_datetime, status} = reservation || {};
  const image_url = image ? image.url : defaultImage;
  const datetime = start_datetime ? `${getFormatedDate(start_datetime, time_zone)}, ${getFormatedTime(start_datetime, time_zone)} - ${getFormatedTime(end_datetime, time_zone)}` : null;
  const amenities = attributes ? attributes.map(a => `${a.type.type}: ${a.value}`).join(' | ') : '';
  const oneDay = 60 * 60 * 24;
  const canCancel = () => {
    if (created && start_datetime) {
      return ((nowUtc - created) < oneDay) || ((start_datetime - nowUtc) > oneDay);
    }

    return false;
  };

  return (
    <div className="meeting-room">
      <div className="meeting-room-image" style={{backgroundImage: `url('${image_url}')`}}/>
      <div className="meeting-room-body">
        <div className="row meeting-room-header">
          <div className="col-xs-10">
            <div className="meeting-room-title">{name}</div>
            {datetime && <div className="meeting-room-date">{datetime}</div>}
          </div>
          {onCancel && canCancel() &&
            <div className="col-xs-2">
              <button className="btn btn-danger btn-xs" onClick={ev => onCancel(reservation, datetime)}>
                {T.translate("bookable_room.cancel")}
              </button>
            </div>
          }
        </div>
        {status &&
          <div className="row row meeting-room-info">
            <div className="col-xs-12">
              {T.translate("bookable_room.status")}: {status}
            </div>
          </div>
        }
        <div className="row meeting-room-info">
          <div className="col-xs-6">
            {T.translate("bookable_room.capacity")}: {capacity}
          </div>
        </div>
        {floor &&
          <div className="row meeting-room-info">
            <div className="col-xs-12">
              {T.translate("bookable_room.floor")}: {floor.name}
            </div>
          </div>
        }
        <div className="row meeting-room-amenities">
          <div className="col-xs-12">
            {amenities}
          </div>
        </div>

        {actionLabel && action &&
          <div onClick={() => {
            action(room.id)
          }} className="availability-button">
            {actionLabel}
            <i className="fa-arrow-right fa"></i>
          </div>
        }
      </div>
    </div>
  );
}
