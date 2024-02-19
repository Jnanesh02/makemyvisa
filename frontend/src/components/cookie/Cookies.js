import Cookie from "js-cookie";

const setCookies = (name, value) => {
  Cookie.set(name, value);
};

const getCookies = (name) => {
  return Cookie.get(name);
};

const removeCookies = (name) => {
  Cookie.remove(name);
};
const CookieUtils = {
   setCookies, getCookies, removeCookies
}
export default CookieUtils;
