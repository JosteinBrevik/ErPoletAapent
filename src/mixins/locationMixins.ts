import {type  IStore } from "../types/customTypes";

enum Ukedager {
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
  "søndag"
}

export enum PermissionStatus {
  GRANTED = "granted",
  DENIED = "denied",
  PROMPT = "prompt"
}

export const hasPermission = async () => {
  return navigator.permissions
    .query({ name: "geolocation" })
    .then(function(result) {
      // console.log(result, result.state === "granted");
      return result.state;
    });
};

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

const getActualDay = () => {
  const today = new Date();
  return (today.getDay() + 6) % 7;
};

export const getNow = () => {
  const today = new Date();
  const dayOfTheWeek: number = getActualDay();
  const time: string = today.getHours() + ":" + today.getMinutes();
  return { currentDay: dayOfTheWeek, currentTime: time };
};

export const closingTimeToday = (store: IStore) => {
  const today = getActualDay();
  return store.openingHours.regularHours[today].closingTime;
};

export const nextOpeningTime = (store: IStore) => {
  const today = getActualDay();
  const dateObj = new Date();
  const { currentTime } = getNow();
  for (let i = 0; i < 6; i++) {
    const checkingDay = (i + today) % 7;
    dateObj.setDate(new Date().getDate() + i);
    const dateString = dateObj.toISOString().substr(0, 10);
    const exceptionHours = store.openingHours.exceptionHours.find(
      ex => ex.date === dateString
    );
    const openingHours = exceptionHours
      ? { closed: !exceptionHours.openingTime, ...exceptionHours }
      : store.openingHours.regularHours[checkingDay];
    if (openingHours.closed) {
      continue;
    }
    const openingTime = timeToMinutes(openingHours.openingTime);
    const closingTime = timeToMinutes(openingHours.closingTime);
    const currentTimeInMinutes = timeToMinutes(currentTime);
    const isToday = i === 0;

    if (
      isToday &&
      closingTime &&
      currentTimeInMinutes &&
      closingTime < currentTimeInMinutes
    ) {
      continue;
    }
    if (openingTime && openingTime > 0) {
      return (
        (i === 0 ? "i dag" : i === 1 ? "i morgen" : Ukedager[checkingDay]) +
        " " +
        openingHours.openingTime
      );
    }
  }
  return null;
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
