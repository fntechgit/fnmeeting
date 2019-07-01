import moment from "moment-timezone";

export const daysBetweenDates = (startDate, endDate, timezone) => {
	let startDay = moment(startDate * 1000).tz(timezone)
	let endDay = moment(endDate * 1000).tz(timezone)

	// Add day one
	let dates = [startDay.clone().unix()]

	// Add all additional days
	while(startDay.add(1, 'days').diff(endDay) < 0) {
		dates.push(startDay.clone().unix())
	}
	return dates
}

export const getDayNumberFromDate = (days, date) => {
	let dayNumber
	days.find((d, index)=>{
		if(d == date){
			dayNumber = index + 1
		}})
	return dayNumber
}