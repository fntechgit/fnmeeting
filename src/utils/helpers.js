import moment from "moment-timezone";
import { epochToMomentTimeZone } from "openstack-uicore-foundation/lib/utils/methods";
import {getAccessToken} from 'openstack-uicore-foundation/lib/security/methods'
import { initLogOut} from 'openstack-uicore-foundation/lib/security/methods';
import {DAY_IN_SECONDS} from "./constants";

export const getAvailableDates = (summit) => {
	const {
		begin_allow_booking_date,
		end_allow_booking_date,
		start_date,
		end_date,
		time_zone_id
	} = summit;
	const bookStartDate = epochToMomentTimeZone(begin_allow_booking_date, time_zone_id);
	const bookEndDate = epochToMomentTimeZone(end_allow_booking_date, time_zone_id);
	const now = moment().utc();
	const dates = [];

	while (bookStartDate <= bookEndDate) {
		if (bookStartDate >= now) {
			const tmp = bookStartDate.clone();
			const dayIdx = Math.ceil((tmp.unix() - start_date) / DAY_IN_SECONDS);
			const summitDayNumber = dayIdx >= 0 && tmp.unix() <= end_date ? dayIdx + 1 : null;
			dates.push({str: tmp.format('Y-M-D'), epoch: tmp.unix(), summitDayNumber});
		}
		bookStartDate.add(1, 'days');
	}

	return dates
};

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

export const getAccessTokenSafely = async () => {
	try {
		return await getAccessToken();
	}
	catch (e) {
		console.log('log out: ', e);
		initLogOut();
	}
};
