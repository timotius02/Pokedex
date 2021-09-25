export const pokemonNumber = (id) => {
  let temp = id.toString();
  if (temp.length < 10) {
    return "#00" + temp;
  } else if (temp.length < 100) {
    return "#0" + temp;
  } else return "#" + temp;
};
