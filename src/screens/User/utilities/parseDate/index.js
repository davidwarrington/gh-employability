/**
 * parseDate
 * Returns a valid date string for Safari compatibility.
 * Replaces '-' in string with '/', replaces non-numeric characters with ' '
 * @param {string} date 
 */
const parseDate = date => {
    const parsed = Date.parse(date);
    /**
     * If the browser can parse the date string, return that parse value.
     */
    if (!isNaN(parsed)) {
      return parsed;
    }
  
    /**
     * If the browser was unable to parse the date string pass to the function,
     * convert the string to a valid string for the browser and parse again.
     */
    return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
}

/**
 * Exports the parseDate function
 */
export default parseDate;