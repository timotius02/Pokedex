import { useLayoutEffect } from "react";

export const pokemonNumber = (id) => {
  if (id < 10) {
    return "#00" + id.toString();
  } else if (id < 100) {
    return "#0" + id.toString();
  } else return "#" + id.toString();
};

/*
Stops Reach Router from scrolling down after navigating to a new page
https://stackoverflow.com/questions/53058110/stop-reach-router-scrolling-down-the-page-after-navigating-to-new-page
*/
export const ScrollToTop = ({ children, location }) => {
  useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

export const Capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
