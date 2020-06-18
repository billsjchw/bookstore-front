function getUser() {
  let json = sessionStorage.getItem('user');
  return json ? JSON.parse(json) : null;
}

function checkAuthority(user, authorityId) {
  for (let role of user.roles)
    for (let authority of role.authorities)
      if (authority.id === authorityId)
        return true;
  return false;
}

function isInt(num) {
  return Number.isInteger(num) &&
         num >= -2147483648 &&
         num < 2147483648;
}

function calcTimeStartEnd(timeRange) {
  let timestampStart = 0;
  let timestampEnd = Date.now();
  let msPerDay = 24 * 60 * 60 * 1000;
  if (timeRange === '7_DAYS')
    timestampStart = timestampEnd - 7 * msPerDay;
  else if (timeRange === '4_WEEKS')
    timestampStart = timestampEnd - 4 * 7 * msPerDay;
  else if (timeRange === '3_MONTHS')
    timestampStart = timestampEnd - 3 * 4 * 7 * msPerDay;
  else if (timeRange === '1_YEAR')
    timestampStart = timestampEnd - 365 * msPerDay;
  else
    timestampStart = 0;
  let pad2 = num => ('0' + num).slice(-2);
  let formatter = date => `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ` +
      `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`;
  return {
    timeStart: formatter(new Date(timestampStart)),
    timeEnd: formatter(new Date(timestampEnd)),
  };
}

export default {getUser, checkAuthority, isInt, calcTimeStartEnd };
