const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('http://api.ipify.org/?format=json')
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip
  return request(`https://freegeoip.app/json/${ip}`)
}

const fetchISSFlyOverTimes = function(body) {
  let {latitude, longitude} = JSON.parse(body)
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)  
  
}

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)  
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = {nextISSTimesForMyLocation}
