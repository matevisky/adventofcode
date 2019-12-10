var request = require('request');

// https://adventofcode.com/2015/day/1/input
const baseUrl = `https://adventofcode.com`
const sessionCookie = ``;

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
