class Auth {
  constructor() {
    this.authenticated = this.checkCookie();
  }
  login(cb = null) {
    this.authenticated = true;
    cb && cb();
  }
  logout(cb = null) {
    this.authenticated = false;
    cb && cb();
  }
  isAuthenticated() {
    return this.checkCookie();
  }
  setCookie(cname, cvalue = false, expires_at = new Date().toUTCString(), expires_in) {
    document.cookie = cname + "=" + cvalue + ";" + new Date(expires_at).toUTCString() + `; Max-Age=${expires_in}` + ";path=/";
  }
  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  deleteCookie(cname) {
    this.setCookie(cname);
  }
  checkCookie() {
    let session = this.getCookie("session");
    if (session && session != "false") return true;
    return false;
  }
}

export default new Auth();
