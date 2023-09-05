import React from "react";
import {getDayNumberFromDate, getFormatedDate} from '../utils/helpers'
import T from "i18n-react";
import {epochToMomentTimeZone} from "openstack-uicore-foundation/lib/utils/methods";

export default ({date, availableDays, time_zone, availability, changeDate, onSelect}) => {
  const dateStr = date ? epochToMomentTimeZone(date, time_zone).format('Y-M-D') : '';
  const currentDay = getDayNumberFromDate(availableDays, dateStr);
  const currentIndex = currentDay - 1
  const previousIndex = (currentIndex > 0) ? currentIndex - 1 : false;
  const nextIndex = (currentIndex + 1 < availableDays.length) ? currentIndex + 1 : false;

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
          {nextIndex && <i className='fa-arrow-right fa' onClick={() => changeDate(availableDays[nextIndex]?.epoch)} />}
        </div>
      </div>
      <div className={'meeting-room-availability-body col-xs-12'}>
        {availability && availability.data !== null ?
          availability.data.map((a) => {
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
            } else {
              return (
                <div key={a.start_date} className={'meeting-room-availability-slot unavailable'}>
                  {T.translate("bookable_room.unavailable")}
                  <br/>
                  {formatedStartTime} - {formatedEndTime}
                </div>
              );
            }

          }) : null}
      </div>
    </div>
  );
}

