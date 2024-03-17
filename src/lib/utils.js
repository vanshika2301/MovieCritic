import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayWithSuffix;
  if (day % 10 === 1 && day !== 11) {
    dayWithSuffix = day + "st";
  } else if (day % 10 === 2 && day !== 12) {
    dayWithSuffix = day + "nd";
  } else if (day % 10 === 3 && day !== 13) {
    dayWithSuffix = day + "rd";
  } else {
    dayWithSuffix = day + "th";
  }

  const formattedDate = `${dayWithSuffix} ${monthNames[monthIndex]}, ${year}`;

  return formattedDate;
}
