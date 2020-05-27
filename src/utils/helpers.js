import moment from "moment-timezone";
import { epochToMomentTimeZone, epochToMoment } from "openstack-uicore-foundation/lib/methods";


export const getAvailableDates = (summit) => {
	let {
		begin_allow_booking_date,
		end_allow_booking_date,
		time_zone_id
	} = summit;
	let bookStartDate = epochToMomentTimeZone(begin_allow_booking_date, time_zone_id);
	let bookEndDate = epochToMomentTimeZone(end_allow_booking_date, time_zone_id);
	let now = moment().tz(time_zone_id);
	let dates = [];

	while (bookStartDate <= bookEndDate) {

		if (bookStartDate >= now) {
			dates.push(bookStartDate.clone().unix());
		}

		bookStartDate.add(1, 'days');
	}
	return dates
};

export const getSummitDates = (summit) => {
	let {start_date, end_date, time_zone_id} = summit;
	let startDate = epochToMomentTimeZone(start_date, time_zone_id);
	let endDate = epochToMomentTimeZone(end_date, time_zone_id);
	let dates = [];

	// Add all additional days
	while(startDate.diff(endDate) < 0) {
		dates.push(startDate.clone().unix());
		startDate.add(1, 'days');
	}
	return dates
};

export const getDayNumberFromDate = (days, date) => {
	let dateIndex = days.findIndex(d => d === parseInt(date));
	return (dateIndex + 1);
}

export const getFormatedDate = (datetime, time_zone = false) => {

	if(time_zone){
		let formattedTime = moment.unix(datetime)
		return moment.tz(datetime * 1000, time_zone).format('MMM Do YYYY')
	}
	return moment.unix(datetime).format('MMM Do YYYY')
}

export const getFormatedTime = (datetime, time_zone = false) => {

	if(time_zone){
		// let formattedTime = moment.unix(datetime).format()
		return moment.tz(datetime * 1000, time_zone).format('HH:mm')
	}
	return moment.unix(datetime).format('HH:mm')
}
