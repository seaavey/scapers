import axios from "axios";

export const fetchJSON = async (url: string, options: any = {}) => {
  const { headers, ...rest } = options;
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      ...headers,
    },
    ...rest,
  });
  return response.data;
}

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

/**
 * Converts a given string to a title case format.
 *
 * @param {string} str - The string to convert to title case
 * @returns {string}  The input string converted to title case
 *
 */
export const Styles = async (text: string): Promise<string> => {
  var xStr = "abcdefghijklmnopqrstuvwxyz1234567890".split("")
  var yStr = Object.freeze({
    1: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890"
  })
  var replacer = [] as any

  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[1].split("")[i]
    })
  )
  var str = text.toLowerCase().split("")
  var output = [] as any
  str.map(v => {
    const find = replacer.find(x => x.original == v) || []
    find ? output.push(find.convert) : output.push(v)
  })
  return output.join("")
}
