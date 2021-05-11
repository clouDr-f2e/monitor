/*
 * @param {string} projectName
 * @param {string} version
 * @return {string} The current session ID for data cleansing
 * */
const generateUniqueID = (projectName: string = 'mito', version: string = '0.0.1'): string => {
  return `${projectName}-${version}-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`
}

export default generateUniqueID
