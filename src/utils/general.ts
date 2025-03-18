/**
 * Delays the execution for a specified amount of time.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay time.
 */
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

/**
 * Formats an object into a JSON string with indentation for better readability.
 *
 * @param {Object} obj - The object to format.
 * @returns {string} A stringified version of the object with indentation.
 */
export const jsonformat = (obj: Object) => JSON.stringify(obj, null, 2)

/**
 * Extracts all URLs from a string using regular expression.
 *
 * @param {string} str - The string from which to extract URLs.
 * @returns {string[] | null} An array of URLs found in the string, or null if no URLs are found.
 */
export const StringToURL = (str: string) => str.match(/\bhttps?:\/\/\S+/gi)

/**
 * Converts a given string to uppercase.
 *
 * @param {string} str - The string to convert to uppercase.
 * @returns {string} The input string converted to uppercase.
 */
export const toUpper = (str: string) => str.toUpperCase()

/**
 * Converts a given string to lowercase.
 *
 * @param {string} str - The string to convert to lowercase.
 * @returns {string} The input string converted to lowercase.
 */
export const toLower = (str: string) => str.toLowerCase()

/**
 * Selects a random element from an array.
 *
 * @param {any[]} arr - The array from which to pick a random element.
 * @returns {any} A random element from the array.
 */
export const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)]
