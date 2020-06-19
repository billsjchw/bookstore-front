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

function isIsbn(str) {
  if (!/^\d{13}$/.test(str))
    return false;
  if (str.slice(0, 3) !== "978")
    return false;
  let code = 0;
  for (let i = 0; i < 12; ++i)
    code += Number(str[i]) * (i % 2 ? 3 : 1);
  code = 10 - code % 10;
  if (code === 10)
    return str[12] === "0";
  else
    return Number(str[12]) === code;
}

function isEmail(str) {
  const regExp = /\S+@\S+.\S+/;
  return regExp.test(str);
}

export default {getUser, checkAuthority, isInt, calcTimeStartEnd, isIsbn, isEmail};
