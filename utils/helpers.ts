import { formatEther } from "viem";

/**
 * Format a timestamp into a human-readable date string.
 *
 * @param timestamp - The timestamp to format.
 * @returns The formatted date string.
 */
export const formatTimestamp = (timestamp: bigint): string => {
  const value = Number(timestamp) * 1000;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(value).toLocaleDateString("en-US", options);
};

/**
 * Convert a date string in the format "yyyy-mm-dd" to a timestamp.
 *
 * @param {string} dateString - The date string to convert.
 * @return {number} The timestamp representing the input date.
 */
export const getTimestampFromDate = (dateString: string): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Math.floor(date.getTime() / 1000);
};

/**
 * Truncates a string if it exceeds a specified length and adds an ellipsis at the end.
 *
 * @param {string} str - The string to truncate.
 * @param {number} n - The maximum length of the truncated string.
 * @return {string} The truncated string with an ellipsis added if necessary.
 */
export const truncateString = (str: string, n: number): string => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};

/**
 * Format a bigint into a string representing an ETH amount.
 *
 * @param amount - The amount to format.
 * @returns The formatted eth string.
 */
export const returnETH = (amount: bigint): string => {
  return `${formatEther(amount)} ETH`;
};

/**
 * Parses error messages and returns a corresponding error message.
 *
 * @param {string} err - The error message to parse.
 * @return {string} The corresponding error message.
 */
export const parseErrors = (err: string) => {
  console.log(err);
  if (err.includes("MissingParams")) {
    return "Missing params";
  } else {
    return "Error during transaction";
  }
};
