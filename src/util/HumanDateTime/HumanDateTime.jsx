export const  HumanDateTime = () => {
    const date = new Date(); // Current date and time

	// Extract date components
	const month = date.toLocaleString("en-US", { month: "long" });
	const day = date.getDate();
	const year = date.getFullYear();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const TOD = hour >= 12 ? "PM" : "AM";


	// Format hour with leading zero for single-digit hours
	const formattedHour = (hour % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format and add leading zero if necessary

	// Format minute with leading zero if necessary
	const formattedMinute = minute.toString().padStart(2, "0");

	// Combine components into a formatted string
	const formattedDate = `${month}, ${day} ${year} ${formattedHour}:${formattedMinute} ${TOD}`;

    const data = {
		full: formattedDate,
		dateWithYear: `${month}, ${day} ${year}`,
		today: `${month}, ${day}`,
		time: `${formattedHour}:${formattedMinute} ${TOD}`,
	};

    return data
}