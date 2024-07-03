import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import queryString from 'query-string'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const handleError = (error) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const formatDateTime = (dateString) => {
  const dateTimeOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export function formUrlQuery({ params, key, value }) {
  const currentUrl = queryString.parse(params)
  // console.log("formUrlQuery: ", currentUrl);
  if(key === 'category' && currentUrl[key] !== value && currentUrl.page){
    delete currentUrl['page'];
  }
  currentUrl[key] = value
  
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = queryString.parse(params)
  // console.log("removeKeysFromQuery: ", currentUrl);
  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}