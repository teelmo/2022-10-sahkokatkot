// https://stackoverflow.com/questions/59016562/parse-csv-records-in-to-an-array-of-objects-in-javascript
const CSVToArray = (CSV_string, delimiter) => {
  delimiter = (delimiter || ','); // user-supplied delimeter or default comma

  const pattern = new RegExp( // regular expression to parse the CSV values.
    ( // Delimiters:
      `(\\${delimiter}|\\r?\\n|\\r|^)`
       // Quoted fields.
       + '(?:"([^"]*(?:""[^"]*)*)"|'
       // Standard fields.
       + `([^"\\${delimiter}\\r\\n]*))`
    ), 'gi'
  );

  const rows = [[]]; // array to hold our data. First row is column headers.
  // array to hold our individual pattern matching groups:
  let matches = false; // false if we don't find any matches
  // Loop until we no longer find a regular expression match
  while (matches !== null) {
    matches = pattern.exec(CSV_string);
    if (matches === null) {
      break;
    }
    const matched_delimiter = matches[1]; // Get the matched delimiter
    // Check if the delimiter has a length (and is not the start of string)
    // and if it matches field delimiter. If not, it is a row delimiter.
    if (matched_delimiter.length && matched_delimiter !== delimiter) {
      // Since this is a new row of data, add an empty row to the array.
      rows.push([]);
    }
    // Once we have eliminated the delimiter, check to see
    // what kind of value was captured (quoted or unquoted):
    // Now that we have our value string, let's add
    // it to the data array.
    rows[rows.length - 1].push((matches[2]) ? matches[2].replace(/""/g, '"') : matches[3]);
  }
  return rows; // Return the parsed data Array
};
export default CSVToArray;
