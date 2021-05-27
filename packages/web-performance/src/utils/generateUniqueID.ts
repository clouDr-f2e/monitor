/*
 * @return {string} The current session ID for data cleansing
 * */
const generateUniqueID = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`
}

export default generateUniqueID
