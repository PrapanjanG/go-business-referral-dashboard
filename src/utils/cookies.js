export function setCookie(name, value, days = 7) {
  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + expireDate.toUTCString() + ";path=/";
}

export function getCookie(name) {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export function removeCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}
