import { useLayoutEffect } from "react";

export const pokemonNumber = (id) => {
  let temp = id.toString();
  if (temp.length < 10) {
    return "#00" + temp;
  } else if (temp.length < 100) {
    return "#0" + temp;
  } else return "#" + temp;
};

/*
Stops Reach Router from scrolling down after navigating to a new page
https://stackoverflow.com/questions/53058110/stop-reach-router-scrolling-down-the-page-after-navigating-to-new-page
*/
export const ScrollToTop = ({ children, location }) => {
  useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};
