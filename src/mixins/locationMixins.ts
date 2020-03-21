import { IStore } from "../types/customTypes";

enum Ukedager {
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
  "søndag"
}

const timeToNumbers = (time: string) => {
  return time.split(":").map(num => Number(num));
};

const timeToMinutes = (time: string) => {
  if (!time) {
    return;
  }
  const [hours, minutes] = time.split(":");
  if (!hours || !minutes) {
    return;
  }
  return Number(hours) * 60 + Number(minutes);
};

export const timeIsBetween = (
  currentTime: string,
  startTime: string,
  endTime: string
) => {
  const currentMinutes = timeToMinutes(currentTime);
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  if (!currentMinutes || !startMinutes || !endMinutes) {
    return false;
  }
  return currentMinutes > startMinutes && currentMinutes < endMinutes;
};

export const getNow = () => {
  const today = new Date();
  const dayOfTheWeek: number = today.getDay();
  const time: string = today.getHours() + ":" + today.getMinutes();
  return { currentDay: dayOfTheWeek, currentTime: time };
};

export const closingTimeToday = (store: IStore) => {
  const today = new Date().getDay();
  return store.openingHours.regularHours[today].closingTime;
};

export const nextOpeningTime = (store: IStore) => {
  const today = new Date().getDay();
  for (let i = 0; i < 6; i++) {
    const checkingDay = (i + today) % 7;
    const openingHours = store.openingHours.regularHours[checkingDay];
    if (openingHours.closed) {
      continue;
    }
    const openingTime = timeToMinutes(openingHours.openingTime);
    if (openingTime && openingTime > 0) {
      return (
        (i === 0 ? "i morgen" : Ukedager[checkingDay]) +
        " " +
        openingHours.openingTime
      );
    }
  }
  return store.openingHours.regularHours[today];
};

export const storeIsOpen = (store: IStore) => {
  const { currentDay, currentTime } = getNow();
  const openingHoursToday = store.openingHours.regularHours[currentDay];
  if (!openingHoursToday) {
    // console.log("no opening hours", store.storeName);
    return false;
  }

  if (openingHoursToday.closed) {
    // console.log("closed", store.storeName);
    return false;
  }
  return timeIsBetween(
    currentTime,
    openingHoursToday.openingTime,
    openingHoursToday.closingTime
  );
};

export const filterStoreName = (storeName: string) => {
  const splitName = storeName.includes(",");
  return splitName ? storeName.split(",")[1].slice(1) : storeName;
};
