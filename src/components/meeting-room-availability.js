import React from "react";
import {getFormatedDate} from '../utils/helpers'
import T from "i18n-react";
import {epochToMomentTimeZone} from "openstack-uicore-foundation/lib/utils/methods";

export default ({date, availableDays, time_zone, availability, changeDate, onSelect}) => {

  const dateStr = date ? epochToMomentTimeZone(date, time_zone).format('Y-M-D') : '';
  const currentIndex = availableDays.findIndex(d => d.str === dateStr);
  const previousIndex = (currentIndex > 0) ? currentIndex - 1 : -1;
  const nextIndex = (currentIndex + 1 < availableDays.length) ? currentIndex + 1 : -1;

  const renderSlots = () => {
    return availability.data.length > 0 ? availability.data.map((a) => {
      let isAvailable = a.status === 'Available';
      let formatedStartTime = epochToMomentTimeZone(a.start_date, time_zone).format('HH:mm');
      let formatedEndTime = epochToMomentTimeZone(a.end_date, time_zone).format('HH:mm');

      if (isAvailable) {
        return (
          <div key={a.start_date} onClick={() => {
            onSelect(a)
          }} className={'meeting-room-availability-slot available'}>
            {T.translate("bookable_room.available")}
            <br/>
            {formatedStartTime} - {formatedEndTime}
          </div>
        );
      }
    }) : <p>{T.translate("bookable_room.not_available_slots")}</p>;
  }

  return (
    <div className={'meeting-room-availability'}>
      <div className={'row meeting-room-availability-date'}>
        <div className={'col-xs-2 nav-arrow prev-arrow'}>
          {previousIndex >= 0 && <i className='fa-arrow-left fa' onClick={() => changeDate(availableDays[previousIndex]?.epoch)} />}
        </div>
        <div className={'col-xs-8'}>
          <h3>Availability</h3>{getFormatedDate(date, time_zone)}
        </div>
        <div className={'col-xs-2 nav-arrow next-arrow'}>
          {nextIndex > 0 && <i className='fa-arrow-right fa' onClick={() => changeDate(availableDays[nextIndex]?.epoch)} />}
        </div>
      </div>
      <div className={'meeting-room-availability-body col-xs-12'}>
        {
          availability && availability.data !== null ? renderSlots() : null
        }
      </div>
    </div>
  );
}

