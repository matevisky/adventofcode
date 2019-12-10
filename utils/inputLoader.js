const dotenv = require('dotenv');
const rp = require('request-promise');
dotenv.config({ path: __dirname + '/../.env' });
const baseUrl = `https://adventofcode.com`
const sessionCookie = `${process.env.SESSION_COOKIE}`;

const enrichDefaultOptions = (options) => {
  const cookie = rp.cookie(`session=${sessionCookie}`);
  const headers = { 'Cookie': cookie };
  return { ...options, headers }

}

const getUrl = (year, day, phase) => {
  return `${baseUrl}/${year}/day/${day}/input`;
}

const getCalendarData = async (year, day, phase) => {
  const url = getUrl(year, day, phase)
  const options = enrichDefaultOptions({ url })
  return await rp(options, (error, response, body) => {
    if (error || response.statusCode != 200) throw { error, response, body }
    // console.log(body)
    return body;
  });
};

module.exports = {
  getCalendarData, getUrl
}
