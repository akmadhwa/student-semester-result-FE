import React from "react";
import Router from "next/router";
import { getTheCookie } from "../helpers/cookies";
import { callApi } from "../helpers/axios";

const loginRoute = "/login";

const checkUserAuthentication = (context) => {
  let { _token } = getTheCookie(context, "_token");
  // let _token = true;

  if (_token) {
    callApi.defaults.headers.Authorization = `Bearer ${_token}`;

    return callApi
      .get("/v1/user")
      .then((res) => {
        return { auth: true, userData: res.data };
      })
      .catch(() => {
        return { auth: false };
      });
  }

  return { auth: false };
};

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const { userData, auth } = await checkUserAuthentication(context);

    // Are you an authorized user or not?
    if (!auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: loginRoute,
        });
        context.res?.end();
      } else {
        Router.replace(loginRoute);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userData,
      });
      return { ...wrappedProps, userData };
    }

    return { userData };
  };

  return hocComponent;
};
