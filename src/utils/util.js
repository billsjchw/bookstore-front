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

export default {getUser, checkAuthority, isInt};
