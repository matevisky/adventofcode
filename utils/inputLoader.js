var request = require('request');

// https://adventofcode.com/2015/day/1/input
const baseUrl = `https://adventofcode.com`
const sessionCookie = `53616c7465645f5f69b3227fd782bdf195913354036ca97265792a9505f64fb64609090ab28c0a9871d1f8f25d1da714`;

const getOptions = () => {
  var cookie = request.cookie(`session=${sessionCookie}`);
  const headers = { 'Cookie': cookie };
  return { headers }

}

const getUrl = (year, day, phase) => {
  return `${baseUrl}/${year}/day/${day}/input`;
}

const getCalendarData = (year, day, phase) => {
  const url = getUrl(year, day, phase)
  request({ url, headers }, (error, response, body) => {
    if (error || response.statusCode != 200) throw {error, response, body}
    return body;
  });
};

module.exports = {
  getCalendarData, getUrl
}
