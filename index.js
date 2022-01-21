const { nextISSTimesForMyLocation } = require('./iss.js');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return
  }
  console.log('It worked! Returned IP:' , ip);
  return ip
})

fetchCoordsByIP('142.112.200.149', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});

fetchISSFlyOverTimes({ latitude: 43.5142, longitude: -79.8845 }, (error, data) => {
  if (error) {
    console.log("no pass data!", error);
    return;
  }
  console.log("it worked!", data);
})

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});