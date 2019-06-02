const { DateTime } = require("luxon");

const terminationTimeout = { minutes: 30 };

module.exports = {
  nextClusterCheckTimestamp
}

// nextClusterCheckTimestamp(20, 'Europe/Helsinki')
function nextClusterCheckTimestamp(clusterCheckHour, userTimeZone) {
  let checkTime = DateTime.local().setZone(userTimeZone).startOf('day').set({hour: clusterCheckHour});
  const checkTimePassed = checkTime.diffNow() < 0;

  if (checkTimePassed) {
    checkTime = checkTime.plus({days: 1});
  }

  const terminationTime = checkTime.plus(terminationTimeout);

  return {
    nextCheckTimestamp: checkTime.toMillis(),
    nextTerminationTimestamp: terminationTime.toMillis(),
  }
}

