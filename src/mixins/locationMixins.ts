import { IStore } from "../types/customTypes";

// export const coordinatesToKms((coordDist: number) => {
//   var R = 6371e3; // metres
//   var φ1 = lat1.toRadians();
//   var φ2 = lat2.toRadians();
//   var Δφ = (lat2-lat1).toRadians();
//   var Δλ = (lon2-lon1).toRadians();

//   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//           Math.cos(φ1) * Math.cos(φ2) *
//           Math.sin(Δλ/2) * Math.sin(Δλ/2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//   var d = R * c;
// })

const timeToNumbers = (time: string) => {
  return time.split(":").map(num => Number(num));
};

export const timeIsBetween = (
  currentTime: string,
  startTime: string,
  endTime: string
) => {
  const [currentHours, currentMinutes] = timeToNumbers(currentTime);

  console.log("Hours:", currentHours, "Minutes", currentMinutes);
  const [startHours, startMinutes] = timeToNumbers(startTime);
  console.log("StartHours:", startHours, "Minutes", startMinutes);
  const [endHours, endMinutes] = timeToNumbers(endTime);
  console.log("EndHours:", endHours, "Minutes", endMinutes);

  if (currentHours > startHours && currentHours < endHours) {
    return true;
  } else if (currentHours === startHours && currentMinutes > startMinutes) {
    return true;
  } else if (currentHours === endHours && currentMinutes < endMinutes) {
    return true;
  }
  return false;
};

export const getNow = () => {
  const today = new Date();
  const dayOfTheWeek: number = today.getDay();
  const time: string = today.getHours() + ":" + today.getMinutes();
  return { currentDay: dayOfTheWeek, currentTime: time };
};

export const storeIsOpen = (store: IStore) => {
  const { currentDay, currentTime } = getNow();
  const openingHoursToday = store.openingHours.regularHours[currentDay];

  if (openingHoursToday.closed) {
    return false;
  }
  return timeIsBetween(
    currentTime,
    openingHoursToday.openingTime,
    openingHoursToday.closingTime
  );
};
