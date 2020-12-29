import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";

export const setTheCookie = (ctx, cookieName, cookieValue) => {
  nookies.set(ctx, cookieName, cookieValue, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const getTheCookie = (ctx, cookieName) => {
  return parseCookies(ctx, cookieName);
};
